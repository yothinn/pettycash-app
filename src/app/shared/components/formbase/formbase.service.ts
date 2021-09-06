import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Formbase } from './formbase';
import * as ts from "typescript";

@Injectable({
  providedIn: 'root'
})
export class FormbaseService implements Resolve<any>{

  // Observable for dynamic layout
  private layoutChanged$ = new BehaviorSubject<any[]>([]);
  public layoutChangedObservable$ = this.layoutChanged$.asObservable();

  private lovGethered$ = new BehaviorSubject<any>({});
  public lovGetheredObservable$ = this.lovGethered$.asObservable();

  constructor(private httpClient: HttpClient) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.getLayouts();
    return;
  }

  toFormGroup(frmCtls: Formbase<string>[], frmData?: any): FormGroup {
    const group: any = {};

    frmCtls.forEach(ctl => {
      if (ctl.controlType === 'lookup' || ctl.controlType === 'autocomplete') {
        this.getLov(ctl);
      };


      if (!frmData) {
        // New Form

        group[ctl.key] = new FormControl({value: ctl.value || '', disabled: ctl.disabled}, this.bindValidations(ctl));

      } else {
        // Edit Form

        group[ctl.key] = ctl.required ? new FormControl({value: frmData[ctl.key] || '', disabled: ctl.disabled}, Validators.required)
          : new FormControl({value: frmData[ctl.key] || '', disabled: ctl.disabled});


      }

    });
    return new FormGroup(group);
  }

  bindValidations(ctl: any) {
    const validList = [];
    if (ctl.required) {
      validList.push(Validators.required);
    }
    if (ctl.min) {
      validList.push(Validators.min(ctl.min));
    }
    if (ctl.max) {
      validList.push(Validators.max(ctl.max));
    }
    if (ctl.minLength) {
      validList.push(Validators.minLength(ctl.minLength));
    }
    if (ctl.maxLength) {
      validList.push(Validators.maxLength(ctl.maxLength));
    }
    if (ctl.pattern) {
      validList.push(Validators.pattern(ctl.pattern));
    }
    if (ctl.type === 'email') {
      validList.push(Validators.pattern(
        "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"
      ));
    }
    return Validators.compose(validList);
  }

  getLayouts(): void {
    this.httpClient.get(`${environment.apiUrl}/api/layouts`)
      .subscribe((layouts: any) => {
        // console.log(JSON.stringify(layouts));
        this.layoutChanged$.next(layouts.data.sort((a, b) => a.order - b.order));
      })

  }

  getLov(ctl: any): void {
    this.httpClient.get(`${environment.apiUrl}/api/${ctl.lov}`)
      .subscribe((res: any) => {
        // console.log(res);
        this.lovGethered$.next({ key: ctl.key, data: res.data });
      });
  }

}
