import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, filter, finalize, tap } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertService } from './alert.service';


const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  constructor(
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService,
    private alertService: AlertService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // this.spinner.show()
    let httpReq = req;
    const token = localStorage.getItem('token');
    if (token != null) {
      httpReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
    }
 
    return next.handle(httpReq).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          if (event.body && event.ok) {
            console.log(httpReq.method);
            switch (httpReq.method.toString()) {
              case 'POST':
                if (httpReq.url.indexOf('signin') < 0 && httpReq.url.indexOf('signup') < 0) {
                  this.alertService.showSuccess('บันทึกข้อมูลเรียบร้อย');
                }
                break;
              case 'PUT':
                // console.log(event.body);

                this.alertService.showSuccess('แก้ไขข้อมูลเรียบร้อย');
                break;
              case 'DELETE':
                // console.log(event.body);
                this.alertService.showSuccess('ลบข้อมูลเรียบร้อย');
                break;
              default:
                break;
            }
          }
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        return throwError(error);
      }),
      finalize(() => {
        this.spinner.hide();
      })
    );
  }
}
