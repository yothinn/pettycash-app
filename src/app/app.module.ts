import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppInterceptor } from './app.interceptor';
import { Layout1Module } from './layout/layout1/layout1.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler } from '@angular/core';
import { GlobalErrorHandler } from './global.error.handler';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { BnNgIdleService } from 'bn-ng-idle';
import { CommonModule } from '@angular/common';
import { MatIconRegistry } from '@angular/material/icon';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { AlertComponent } from './components/alert/alert.component';
import { SharedModule } from './shared/shared.module';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL'
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY'
  }
};

@NgModule({
  declarations: [
    AppComponent,
    ConfirmDialogComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    Layout1Module
  ],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    BnNgIdleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'chat',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/chat.svg'));
    iconRegistry.addSvgIcon(
      'contact',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/contact.svg'));
    iconRegistry.addSvgIcon(
      'production',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/production.svg'));
    iconRegistry.addSvgIcon(
      'line',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/line.svg'));
    iconRegistry.addSvgIcon(
      'process',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/process.svg'));

    iconRegistry.addSvgIcon(
      'mail',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/mail.svg'));
    iconRegistry.addSvgIcon(
      'usermanage',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/usermanage.svg'));
    iconRegistry.addSvgIcon(
      'change-password',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/change-password.svg'));
    iconRegistry.addSvgIcon(
      'idcard',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/id-card_2.svg'));
  }

}
