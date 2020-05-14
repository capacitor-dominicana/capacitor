import { FormGroup, FormControl, AbstractControl, FormArray } from "@angular/forms";
import { Observable } from "rxjs";

/**
 * Own
 */
import { QuestionBase } from "@capacitor/shared/helpers";
import { AutocompleteOption } from "@capacitor/shared/models";

export interface IQuestionControlService {
    toFormGroup(questions: QuestionBase<any>[]): FormGroup;
    addFormGroup(properties: any, abstractControl: AbstractControl, formGroup?: FormGroup): void;
    toFormControl(question: QuestionBase<any>): FormControl | FormArray | FormGroup;
    removePropertiesNotInForm(formGroup: FormGroup, entity: any): any
    tryGetFormQuestionControlsFromMetadata<T>(modelMetadata: any): QuestionBase<T>[];
    filterListFromFormControlInputChanges<T>(
        inputFormControl: FormControl,
        resource: Observable<T[]>,
        propertiesToFilterBy: string[],
        propertyNamesForAutocompleteOptions: AutocompleteOption
    ): Observable<AutocompleteOption[]>;
    onFileItemAdded(question: any, currentAbstractControl: AbstractControl, files: Array<File>, imgContainerId?: string): void;
    onFileItemRemoved(question: any, currentAbstractControl: AbstractControl, imgContainerId?: string): void;
    validateFormGroupControls(currentFormGroup: FormGroup): boolean;
}
