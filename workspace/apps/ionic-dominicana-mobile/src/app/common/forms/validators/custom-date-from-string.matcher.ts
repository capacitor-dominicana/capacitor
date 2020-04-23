import { FormGroup, AbstractControl, ValidatorFn } from "@angular/forms";
import * as moment from "moment";

export function CustomDateFromStringValidator(currentFormControl: AbstractControl): any {
    const dateValue = currentFormControl.value as string;
    const currentYearIfExists = (dateValue || "").substring(0, 4).replace(/\D/gm,"");
    if (dateValue
        && (currentYearIfExists.length < 4
            || parseInt(currentYearIfExists, null) < 1001
            || !moment(dateValue.replace(/\D+/g, ""), "YYYYMMDD").isValid())
    ) {
        return {
            isValid: false
        };
    }
    return null;
}
