import { FormGroup, AbstractControl } from "@angular/forms";

export function DependOnAnotherFieldValidator(formGroup: FormGroup, currentFormControl: AbstractControl, fieldNameOnWhichDepends: string): any {
    const formControlOnWhichDepends = formGroup.get(fieldNameOnWhichDepends);
    if (formControlOnWhichDepends
        && formControlOnWhichDepends.value
        && formControlOnWhichDepends.valid
        && (currentFormControl.value == null || currentFormControl.value === "")) {
        return {
            isRequired: true
        };
    }
    return null;
}
