import { AbstractControl, ValidatorFn, ValidationErrors } from "@angular/forms";

export function rangeDateValidator(min: number, max: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const year = control.value;
        if(min <= year && year <= max) {
            return null;
        } else {
            return { "min": {value: {min, max}}};
        }
    };
}