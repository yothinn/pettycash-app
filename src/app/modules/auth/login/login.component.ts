import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Formbase } from 'src/app/shared/components/formbase/formbase';
import { FormbaseService } from 'src/app/shared/components/formbase/formbase.service';
import { AuthService } from '../../../services/auth.service';
import { Animations } from 'src/app/shared/animations'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: Animations
})
export class LoginComponent implements OnInit, OnDestroy {
  formBase: Formbase<string>[] = [];
  form: FormGroup;
  layout: any
  // Private
  private _unsubscribeAll: Subject<any>;
  constructor(private auth: AuthService, private router: Router, private formBaseService: FormbaseService,) {
    this._unsubscribeAll = new Subject();

  }
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  ngOnInit(): void {
    this.formBaseService.layoutChangedObservable$
      .pipe(
        takeUntil(this._unsubscribeAll),
        map(layouts => { return layouts.filter(layout => layout.key === 'login') })
      )
      .subscribe((layouts) => {
        this.layout = layouts[0];
        this.formBase = this.layout?.forms || [];
        this.form = this.formBaseService.toFormGroup(this.formBase);
      })
  }

  // UI Events
  onSubmit(): void {
    const payLoad = this.form.getRawValue();

    if (payLoad) {
      this.auth.login(payLoad);
    }

  }
}
