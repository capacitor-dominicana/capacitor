import { ValidatorFn, AbstractControl, FormGroup, FormArray } from "@angular/forms";
import { DateBetweenDependency } from "@capacitor/shared/helpers";

export function dateLessThanAnother(formGroup: FormGroup, formControlKey: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const endDateControl = formGroup.get(formControlKey);
        if (!endDateControl) {
            return null;
        }
        const startDateValue = control.value;
        endDateControl.valueChanges.subscribe(value => {
            if (startDateValue < value) {
                control.updateValueAndValidity({ onlySelf: true, emitEvent: false });
                return null;
            }
        });
        const startDateLessThanEndDate: boolean = startDateValue < endDateControl.value;
        return !startDateLessThanEndDate ? {
            "Start date greater than end date": {
                value: startDateValue
            }
        } : null;
    };
}

export function dateBetween(formGroup: FormGroup, dateBetweenDependency: DateBetweenDependency): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        let startDateControl: any = formGroup;
        if (dateBetweenDependency.dependentFieldsAreInParentForm) {
            startDateControl = startDateControl.parent;
            if (startDateControl instanceof FormArray) {
                startDateControl = startDateControl.parent;
            }
        }
        if (!startDateControl) {
            return null;
        }
        startDateControl = startDateControl.get(dateBetweenDependency.startDateFormControlKey);

        let endDateControl: any = formGroup;
        if (dateBetweenDependency.dependentFieldsAreInParentForm) {
            endDateControl = endDateControl.parent;
            if (endDateControl instanceof FormArray) {
                endDateControl = startDateControl.parent;
            }
        }
        if (!endDateControl) {
            return null;
        }
        endDateControl = endDateControl.get(dateBetweenDependency.endDateFormControlKey);

        if (!startDateControl || !endDateControl) {
            return null;
        }

        const dateValue = control.value;

        startDateControl.valueChanges.subscribe(value => {
            if (dateValue > value) {
                control.updateValueAndValidity({ onlySelf: true, emitEvent: false });
                return null;
            }
        });

        endDateControl.valueChanges.subscribe(value => {
            if (dateValue < value) {
                control.updateValueAndValidity({ onlySelf: true, emitEvent: false });
                return null;
            }
        });

        const startDateGreaterThanStartDateAndLessThanEndDate: boolean = dateValue > startDateControl.value && dateValue < endDateControl.value;
        return !startDateGreaterThanStartDateAndLessThanEndDate ? {
            "Date lesser than start date or greater than end date": {
                value: dateValue
            }
        } : null;
    };
}