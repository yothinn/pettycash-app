import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ValidatorFn, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { checkConfirmPasswordValidator } from '../check-confirm-password.validate';

export class PasswordErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
};
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  isShowOldPassword: boolean = false;
  isShowNewPassword: boolean = false;
  isShowConfirmPassword: boolean = false;

  pwdForm: FormGroup;

  matcher = new PasswordErrorStateMatcher();

  constructor(
    public dialogRef: MatDialogRef<ResetPasswordComponent>,
    private fb: FormBuilder,
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.pwdForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {validators: checkConfirmPasswordValidator});
  }

  checkConfirmPassword() {
    let pwd = this.pwdForm.getRawValue();
    let isSame = (pwd.newPassword === pwd.confirmPassword);

    return isSame;
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    let pwd = this.pwdForm.getRawValue();

    console.log(pwd);
    this.auth.resetPassword(pwd).subscribe(res => {

      this.dialogRef.close(true);
    });
  }

}