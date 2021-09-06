import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export const checkConfirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

  const newPassword = control.get('newPassword').value;
  const confirmPassword = control.get('confirmPassword').value;

  console.log(newPassword);
  console.log(confirmPassword);
  return newPassword === confirmPassword ? null : { notSame: true};
};
