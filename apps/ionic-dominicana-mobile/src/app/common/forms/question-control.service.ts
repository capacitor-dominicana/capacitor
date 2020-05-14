import { Injectable, Inject } from "@angular/core";
import { FormControl, FormGroup, Validators, FormArray, ValidationErrors, AbstractControl } from "@angular/forms";
import { Observable } from "rxjs";
import { startWith, debounceTime, switchMap, map, distinctUntilChanged } from "rxjs/operators";
import * as _ from "lodash";

/**
 * Own
 */
// models
import {
    QuestionBase,
    DropdownQuestion,
    TextboxQuestion,
    IQuestionControlOptions,
    HiddenQuestion,
    CheckboxQuestion,
    DateQuestion,
    MultipleQuestion,
    ITuple,
    SetupQuestion,
    AutocompleteQuestion,
    FileQuestion,
    CustomDateQuestion,
    TextAreaQuestion,
    SingleQuestion
} from "@capacitor/shared/helpers";
import { Identifier } from "@capacitor/shared/decorators";
import { QUESTION_CONTROL_SERVICE_TOKEN, FACADE_SERVICE_TOKEN } from "../tokens";
import { AutocompleteOption, PropertyType } from "@capacitor/shared/models";
import { KeyValuePair } from "@capacitor/shared/models";

// providers
import { IQuestionControlService } from "./question-control.service.model";
import { IFacadeService } from "..";
import { TranslateService } from "@ngx-translate/core";

// validators
import { CustomDateFromStringValidator } from "./validators";
import { dateLessThanAnother, dateBetween } from "./validators/date-validation.directive";

@Injectable()
@Identifier({
    token: QUESTION_CONTROL_SERVICE_TOKEN
})
export class QuestionControlService implements IQuestionControlService {
    constructor(
        @Inject(FACADE_SERVICE_TOKEN) public facadeService: IFacadeService,
        public translateService: TranslateService) {}

    public toFormGroup(questions: QuestionBase<any>[]): FormGroup {
        const group: any = {};

        questions.forEach((question: QuestionBase<any>) => {
            group[question.key] = this.toFormControl(question);
        });
        let formGroup: FormGroup = new FormGroup(group);
        formGroup = this.manageDependentFields(questions, formGroup);
        formGroup = this.setFormValidators(questions, formGroup);
        return formGroup;
    }

    public addFormGroup(metadata: any, abstractControl: AbstractControl, formGroup?: FormGroup): void {
        const metadataClone: any = _.clone(metadata);
        const formControls: QuestionBase<any>[] = this.tryGetFormQuestionControlsFromMetadata(metadataClone);
        if (!formGroup) {
            formGroup = this.toFormGroup(formControls);
            const formArray: FormArray = abstractControl as FormArray;
            formArray.push(formGroup);

            const isFirstFormGroupAdded: boolean = formArray.controls && formArray.controls.length === 1;
            if (isFirstFormGroupAdded) {
                formControls.forEach((control: QuestionBase<any>) => {
                    if ((control as CheckboxQuestion<any>).atLeastOneMustBeChecked) {
                        formGroup.get(control.key).setValue(true);
                    }
                });
            }
        }
        (abstractControl as any).list.push({ formGroup, formControls });
    }

    public toFormControl(question: QuestionBase<any>): FormControl | FormArray | FormGroup {
        switch(question.propertyType) {
            case PropertyType.MULTIPLE: {
                let formGroups: FormGroup[] = [];
                const list: Array<{ formGroup: FormGroup, formControls: QuestionBase<any>[] }> = [];
                if (question.value && question.value.length > 0) {
                    const metadata: any = (question as MultipleQuestion<any>).properties;
                    formGroups = question.value.map((item: any) => {
                        const formControls = this.tryGetFormQuestionControlsFromMetadata(metadata);
                        const formGroup: FormGroup = this.toFormGroup(formControls);
                        list.push({formGroup, formControls});
                        item = this.removePropertiesNotInForm(formGroup, item);
                        formGroup.patchValue(item, {emitEvent: false});
                        return formGroup;
                    });
                }
                const formArray: FormArray = new FormArray(formGroups);
                (formArray as any).list = list;
                return formArray;
            }
            case PropertyType.SINGLE: {
                const metadata: any = (question as SingleQuestion<any>).properties;
                const formControls = this.tryGetFormQuestionControlsFromMetadata(metadata);
                const formGroup: FormGroup = this.toFormGroup(formControls);
                (formGroup as any).formControls = formControls;
                (formGroup as any).label = question.label;
                return formGroup;
            }
            default:
                const defaultValue: boolean | string = (question.value || (question.propertyType === PropertyType.CHECKBOX ? false : ""));
                const formControl: FormControl = new FormControl({ value: defaultValue, disabled: question.disabled });
                (formControl as any).key = question.key;
                (formControl as any).label = question.label;

                switch (question.propertyType) {
                    case PropertyType.HIDDEN:
                        formControl.setValue(question.value, {emitEvent: false});
                        break;
                    case PropertyType.DROPDOWN:
                        (formControl as any).options = (question as DropdownQuestion<number>).values;
                        break;
                }

                return formControl;
        }
    }

    private manageDependentFields(questions: QuestionBase<any>[], formGroup: FormGroup): FormGroup {
        const formControlKeys: string[] = Object.keys(formGroup.controls);
        formControlKeys.forEach(formControlKey => {
            const question: QuestionBase<any> = questions.find(x => x.key === formControlKey);
            const currentAbstractControl: AbstractControl = formGroup.get(formControlKey);
            currentAbstractControl.valueChanges.pipe(distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))).subscribe(value => {
                const dependentFields: KeyValuePair<string, any>[] = question.dependentFields;
                if (dependentFields && dependentFields.length > 0) {
                    dependentFields.forEach((dependentField: KeyValuePair<string, any>) => {
                        const dependentFieldQuestion: QuestionBase<any> = questions.find(x => x.key === dependentField.key);
                        // tslint:disable-next-line: triple-equals
                        if (currentAbstractControl.value == dependentField.value) {
                            dependentFieldQuestion.displayInForm = true;
                            formGroup.addControl(dependentField.key, this.toFormControl(dependentFieldQuestion));
                            formGroup = this.setFormValidators(questions, formGroup);
                        } else {
                            dependentFieldQuestion.displayInForm = false;
                            formGroup.removeControl(dependentField.key);
                        }
                    });
                }

                const dependentDropdown = question.dependentDropdown;
                if (dependentDropdown && dependentDropdown.key && dependentDropdown.value) {
                    this.manageDependentDropdowns(dependentDropdown, formGroup, question, value);
                }

                if (question.propertyType === PropertyType.MULTIPLE) {
                    (currentAbstractControl as FormArray).controls.forEach((childFormGroup: FormGroup) => {
                        Object.keys(childFormGroup.controls).forEach((key: string) => {
                            const dependentDropdownQuestion = questions.filter(x => {
                                return x.dependentDropdown &&
                                x.dependentDropdown.key &&
                                x.dependentDropdown.value;
                            }).find(x => x.dependentDropdown.key === key);
                            if (dependentDropdownQuestion) {
                                const dependentDropdownValue = formGroup.get(dependentDropdownQuestion.key).value;
                                this.manageDependentDropdowns(
                                    dependentDropdownQuestion.dependentDropdown,
                                    formGroup,
                                    dependentDropdownQuestion,
                                    dependentDropdownValue);
                            }
                        });
                    });
                }
            });
        });
        return formGroup;
    }

    private manageDependentDropdowns(
        dependentDropdown: KeyValuePair<string, (id: any) => Promise<KeyValuePair<number, string>[]>>,
        formGroup: FormGroup,
        question: QuestionBase<any>,
        value: any): void {
        const dependentDropdownControls: FormControl[] = [];
        const setdependentDropdownControlsRecursively = (group: FormGroup): void => {
            const keys: string [] = Object.keys(group.controls);
            keys.forEach(key => {
                const abstractControl: AbstractControl = group.get(key);
                if (abstractControl instanceof FormControl) {
                    if (key === dependentDropdown.key) {
                        dependentDropdownControls.push(abstractControl);
                    }
                } else if (abstractControl instanceof FormArray) {
                    abstractControl.controls.forEach((childFormGroup: FormGroup) => {
                        setdependentDropdownControlsRecursively(childFormGroup);
                    });
                } else if (abstractControl instanceof FormGroup) {
                    setdependentDropdownControlsRecursively(abstractControl);
                }
            });
        };
        setdependentDropdownControlsRecursively(formGroup);

        if (question.propertyType === PropertyType.AUTOCOMPLETE) {
            if (value) {
                value = value.id;
            }
        }
        if (dependentDropdownControls && dependentDropdownControls.length > 0) {
            dependentDropdownControls.forEach((dependentDropdownControl: FormControl) => {
                this.facadeService.lifecycle.taskInProgress = true;
                if (value) {
                    dependentDropdown.value(value).then((values: KeyValuePair<number, string>[]) => {
                        (dependentDropdownControl as any).options = values;
                        this.facadeService.lifecycle.taskInProgress = false;
                    }).catch(() => {
                        (dependentDropdownControl as any).options = [];
                        this.facadeService.lifecycle.taskInProgress = false;
                    });
                } else {
                    (dependentDropdownControl as any).options = [];
                    this.facadeService.lifecycle.taskInProgress = false;
                }
            });
        }
    }

    public removePropertiesNotInForm(formGroup: FormGroup, entity: any): any {
        const formGroupProperties: any = formGroup.value;
        for (const prop in entity) {
            if (Object.prototype.hasOwnProperty.call(entity, prop)) {
                if (!Object.keys(formGroupProperties).includes(prop)) {
                    delete entity[prop];
                }
            }
        }
        return entity;
    }

    private setFormValidators(questions: QuestionBase<any>[], formGroup: FormGroup): FormGroup {
        questions.filter(x => x.propertyType !== PropertyType.MULTIPLE).forEach((question: QuestionBase<any>) => {
            const formControl: FormControl = formGroup.get(question.key) as FormControl;
            if (formControl) {
                const validators: Array<(control: AbstractControl) => ValidationErrors> = [];

                switch (question.propertyType) {
                    case PropertyType.DATE:
                        if ((question as DateQuestion<any>).lessThan) {
                            validators.push(dateLessThanAnother(formGroup, (question as DateQuestion<any>).lessThan));
                        }
                        if ((question as DateQuestion<any>).dateBetween) {
                            validators.push(dateBetween(formGroup, (question as DateQuestion<any>).dateBetween));
                        }
                        break;
                    case PropertyType.CUSTOM_DATE:
                        validators.push(CustomDateFromStringValidator.bind(null));
                        break;
                    case PropertyType.NUMBER:
                        let regex: RegExp = /^\d+$/;
                        if (question.allowDecimals) {
                            regex = /^[0-9]*\.?[0-9]*$/;
                        }
                        validators.push(Validators.pattern(regex));
                        break;
                }
                if (question.required) {
                    validators.push(Validators.required);
                }
                if (question.minCharacterLength) {
                    validators.push(Validators.minLength(question.minCharacterLength));
                }
                if (question.maxCharacterLength) {
                    validators.push(Validators.maxLength(question.maxCharacterLength));
                }

                formControl.setValidators(validators);
                formControl.updateValueAndValidity();
            }
        });
        return formGroup;
    }

    public tryGetFormQuestionControlsFromMetadata<T>(modelMetadata: any): QuestionBase<T>[] {
        const includeProperties: SetupQuestion<any> = modelMetadata.includeProperties;
        const excludeProperties: SetupQuestion<any> = modelMetadata.excludeProperties;
        const metadataKeys = Object.keys(modelMetadata);
        let filterProps: any[];
        const applyPropertiesFiltering = (props: number[], isExclude?: boolean): any => {
            let newModelMetadata: any = {};
            filterProps = props;

            metadataKeys.forEach((key: string, idx: number, arr: string[]) => {
                if (filterProps.some(x => x === idx || x === key)) {
                    if (!isExclude) {
                        newModelMetadata[key] = modelMetadata[key];
                        return;
                    }
                    delete modelMetadata[key];
                    newModelMetadata = modelMetadata;
                }
            });
            return newModelMetadata;
        };

        if (includeProperties && includeProperties.properties && includeProperties.properties.length) {
            modelMetadata = applyPropertiesFiltering(includeProperties.properties);
        }

        if (excludeProperties && excludeProperties.properties && excludeProperties.properties.length) {
            modelMetadata = applyPropertiesFiltering(excludeProperties.properties, true);
        }

        const formQuestionControls: QuestionBase<T>[] = [];
        for (const modelData in modelMetadata) {
            if ((modelMetadata as object).hasOwnProperty(modelData)) {
                const currentPropertyData: QuestionBase<T> = (modelMetadata[modelData] as QuestionBase<T>);
                if (currentPropertyData) {
                    const options: IQuestionControlOptions<T> = {
                        propertyType: currentPropertyData.propertyType,
                        key: currentPropertyData.key,
                        value: currentPropertyData.value,
                        label: currentPropertyData.label,
                        placeholder: currentPropertyData.placeholder,
                        required: currentPropertyData.required,
                        dependentFields: currentPropertyData.dependentFields,
                        minCharacterLength: currentPropertyData.minCharacterLength,
                        maxCharacterLength: currentPropertyData.maxCharacterLength,
                        allowDecimals: currentPropertyData.allowDecimals,
                        displayInForm: true,
                        displayInFilter: currentPropertyData.displayInFilter,
                        dependentDropdown: currentPropertyData.dependentDropdown
                    };
                    switch (currentPropertyData.propertyType) {
                        case PropertyType.HIDDEN:
                            formQuestionControls.push(new HiddenQuestion<T>(options));
                            break;
                        case PropertyType.INPUT:
                            formQuestionControls.push(new TextboxQuestion<T>(
                                options,
                                (currentPropertyData as TextboxQuestion<T>).autocompleteLocalOpts
                            ));
                            break;
                        case PropertyType.NUMBER:
                            formQuestionControls.push(new TextboxQuestion<T>(
                                options,
                                (currentPropertyData as TextboxQuestion<T>).autocompleteLocalOpts
                            ));
                            break;
                        case PropertyType.TEXT_AREA:
                            formQuestionControls.push(new TextAreaQuestion<T>(
                                options,
                                (currentPropertyData as TextAreaQuestion<T>).hint
                            ));
                            break;
                        case PropertyType.CHECKBOX:
                            formQuestionControls.push(new CheckboxQuestion<T>(
                                options,
                                (currentPropertyData as CheckboxQuestion<T>).isUnique,
                                (currentPropertyData as CheckboxQuestion<T>).atLeastOneMustBeChecked));
                            break;
                        case PropertyType.DATE:
                            formQuestionControls.push(new DateQuestion<T>(
                                options,
                                (currentPropertyData as DateQuestion<T>).startDate,
                                (currentPropertyData as DateQuestion<T>).startView,
                                (currentPropertyData as DateQuestion<T>).lessThan,
                                (currentPropertyData as DateQuestion<T>).dateBetween));
                            break;
                        case PropertyType.CUSTOM_DATE:
                            formQuestionControls.push(new CustomDateQuestion<T>(
                                options,
                                (currentPropertyData as CustomDateQuestion<T>).startDate));
                            break;
                        case PropertyType.DROPDOWN:
                            formQuestionControls.push(new DropdownQuestion<T>(
                                options,
                                (currentPropertyData as DropdownQuestion<T>).values,
                                (currentPropertyData as DropdownQuestion<T>).source));
                            break;
                        case PropertyType.MULTIPLE:
                            formQuestionControls.push(new MultipleQuestion<T>(
                                options,
                                (currentPropertyData as MultipleQuestion<T>).properties));
                            break;
                        case PropertyType.SINGLE:
                            formQuestionControls.push(new SingleQuestion<T>(
                                options,
                                (currentPropertyData as SingleQuestion<T>).properties,
                                (currentPropertyData as SingleQuestion<T>).saveOptionController));
                            break;
                        case PropertyType.AUTOCOMPLETE:
                            formQuestionControls.push(new AutocompleteQuestion<T, any>(
                                options,
                                (currentPropertyData as AutocompleteQuestion<T, any>).propertiesToFilterBy,
                                (currentPropertyData as AutocompleteQuestion<T, any>).source,
                                (currentPropertyData as AutocompleteQuestion<T, any>).entity,
                                (currentPropertyData as AutocompleteQuestion<T, any>).entities,
                                (currentPropertyData as AutocompleteQuestion<T, any>).entitiesList,
                                (currentPropertyData as AutocompleteQuestion<T, any>).propertyNamesForAutocompleteOptions,
                                (currentPropertyData as AutocompleteQuestion<T, any>).isMultiselect));
                            break;
                        case PropertyType.FILE:
                            formQuestionControls.push(new FileQuestion<T>(
                                options,
                                (currentPropertyData as FileQuestion<T>).fileType,
                                (currentPropertyData as FileQuestion<T>).multipleFiles,
                                (currentPropertyData as FileQuestion<T>).fileSource,
                                (currentPropertyData as FileQuestion<T>).fileContainerId));
                            break;
                    }
                }
            }
        }
        return formQuestionControls;
    }

    public filterListFromFormControlInputChanges<T>(
        formControl: FormControl,
        resource: Observable<T[]>,
        propertiesToFilterBy: string[],
        propertyNamesForAutocompleteOptions: AutocompleteOption
    ): Observable<AutocompleteOption[]> {
        let currentModel: any;
        return formControl
            .valueChanges
            .pipe(
                startWith(""),
                debounceTime(500),
                switchMap(model => {
                    currentModel = model;
                    return resource;
                }),
                map((val: T[]) => {
                    let filteredResults: T[];
                    if (currentModel && typeof currentModel === "string") {
                        filteredResults = val.filter((entity: T) => {
                            return propertiesToFilterBy.some((propertyToFilterBy: string) => {
                                if (entity[propertyToFilterBy]) {
                                    return entity[propertyToFilterBy].toLowerCase().indexOf(currentModel.toLowerCase()) === 0;
                                }
                                return false;
                            });
                        });
                    } else {
                        filteredResults = _.orderBy((val).slice(), propertiesToFilterBy);
                    }

                    const autoCompleteOptions: AutocompleteOption[] = filteredResults.map((result) => {
                        return {
                            id: result[propertyNamesForAutocompleteOptions.id],
                            value: result[propertyNamesForAutocompleteOptions.value],
                            description: result[propertyNamesForAutocompleteOptions.description],
                            image: result[propertyNamesForAutocompleteOptions.image]
                        };
                    });
                    return autoCompleteOptions;
                })
            );
    }

    public onFileItemAdded(
        fileSettings: any,
        currentAbstractControl: AbstractControl,
        files: Array<File>, imgContainerId?: string): void {
        if ((fileSettings as FileQuestion<any>).multipleFiles) {
            currentAbstractControl.setValue(files);
            return;
        }
        const simpleFile = files[0];
        currentAbstractControl.setValue(simpleFile);
        if (imgContainerId) {
            this.facadeService.util.readImageFromURL(simpleFile, imgContainerId);
        }
    }

    public onFileItemRemoved(
        fileSettings: any,
        currentAbstractControl: AbstractControl,
        imgContainerId?: string): void {
        currentAbstractControl.setValue([]);
        if (imgContainerId) {
            this.facadeService.util.readImageFromURL(null, imgContainerId);
        }
        if (fileSettings && (fileSettings as FileQuestion<any>).fileSource) {
            (fileSettings as FileQuestion<any>).fileSource = null;
        } else if (typeof fileSettings === "string") {
            fileSettings = null;
        }
    }

    public validateFormGroupControls(currentFormGroup: FormGroup): boolean {
        const invalidFormControls = this.findInvalidFormControls(currentFormGroup);
        if (invalidFormControls && invalidFormControls.length > 0) {
            currentFormGroup.markAllAsTouched();
            const invalidFormControlsNames: string = invalidFormControls.map((x, y) => "<br>" + String(y + 1) + "- " + (x.text || x.value)).join(".") + ".";
            this.facadeService.notification.warning(`Hay almenos (${invalidFormControls.length}) campos inválidos o vacíos. <br>
                                                  ${invalidFormControlsNames}`);
            return false;
        }
        return true;
    }

    private findInvalidFormControls(formGroup: FormGroup): ITuple<string>[] {
        const invalidFields: ITuple<string>[] = [];
        const setInvalidFields = (fieldName: string, fieldLabel: string) => {
            invalidFields.push({
                value: fieldName,
                text: fieldLabel
            });
        };

        const controls = formGroup.controls;
        for (const fieldName in controls) {
            if (controls.hasOwnProperty(fieldName)) {
                const currentFormArrayIfExists = (controls[fieldName] as FormArray);
                if (currentFormArrayIfExists instanceof FormArray && currentFormArrayIfExists.controls && currentFormArrayIfExists.controls.length > 0) {
                    const formGroups: Array<FormGroup> = currentFormArrayIfExists.controls.map(x => x as FormGroup);
                    formGroups.forEach((formGroupInArray: FormGroup) => {
                        if (formGroupInArray.invalid) {
                            invalidFields.push(...this.findInvalidFormControls(formGroupInArray));
                        }
                    });
                } else if (!Array.isArray(controls[fieldName].value)) {
                    if (controls[fieldName].invalid) {
                        setInvalidFields(fieldName, this.translateService.instant((controls[fieldName] as any).label));
                    }
                }
            }
        }
        return invalidFields;
    }
}
