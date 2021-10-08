import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class AppValidators {
    static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (!control.value) {
                return null;
            }

            const valid = regex.test(control.value);
            return valid ? null : error;
        };
    }

    static passwordMatchValidator(): ValidatorFn {

        return (control: AbstractControl): ValidationErrors | null => {
            let password: string = (control.get('password') as FormControl).value;
            let confirm: string = (control.get('confirm') as FormControl).value;

            const matchError: ValidationErrors = { NoPasswordMatch: true };
            if (password != confirm) {
                (control.get('confirm') as FormControl).setErrors(matchError);
                return matchError;
            } else {
                (control.get('confirm') as FormControl).setErrors(null);
                return null;
            }
        }
    }
}
