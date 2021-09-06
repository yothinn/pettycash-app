import { NgModule } from '@angular/core';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormbaseService } from 'src/app/shared/components/formbase/formbase.service';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    resolve: [FormbaseService]
  },
  // {
  //   path: 'register',
  //   component: RegisterComponent
  // },
  // {
  //   path: 'reset-password',
  //   component: RegisterComponent
  // }
];
@NgModule({
  declarations: [RegisterComponent, LoginComponent, ResetPasswordComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

    SharedModule
  ]
})
export class AuthModule { }
