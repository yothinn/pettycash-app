import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { AlertService } from './alert.service';


@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  // Error handling is important and needs to be loaded first.
  // Because of this we should manually inject the services with Injector.
  constructor(private injector: Injector) { }

  handleError(error: any | Error | HttpErrorResponse) {

    const notifier = this.injector.get(AlertService);

    let message;

    console.log(error);
    // let stackTrace = null;

    if (error instanceof HttpErrorResponse) {
      // Server Error
      message = this.getServerMessage(error);
    } else {
      // Client Error
      error = error.rejection;
      message = this.getClientMessage(error);
    }

    notifier.showError(message);

    console.error(error);
  }

  getClientMessage(error: Error): string {
    if (!navigator.onLine) {
      return 'No Internet Connection';
    }

    let msg;

    if (error instanceof Error) {
      msg = error.message ? error.message : error.toString()
    } else {
      msg = error;
    }

    return `!!Error: ${msg}`;
  }

  getServerMessage(error: HttpErrorResponse): string {
    let msg = error.error ? error.error.message : error.message;
    return `Status code: ${error.status} \r\nServer Error : ${msg} \r\n`;
  }

}
