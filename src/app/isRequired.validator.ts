import { AbstractControl, ValidatorFn, ValidationErrors } from "@angular/forms";

export function isRequiredValidator(controlName1, controlName2): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value1 = control.get(controlName1).value;
        const value2 = control.get(controlName2).value;

        if (value1 !== "" && value1 !== " " || value2 > 0) {
            return null;
        } else {
            return {"isRequired": {actual: value1, expected: value2}};
        }
    };
}