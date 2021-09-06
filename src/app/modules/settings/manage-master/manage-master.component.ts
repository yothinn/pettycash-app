import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormbaseService } from 'src/app/shared/components/formbase/formbase.service';
import { FormGroup } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Formbase } from 'src/app/shared/components/formbase/formbase';
import { AuthService } from 'src/app/services/auth.service';
import { SettingsService } from 'src/app/services/settings.service';


@Component({
  selector: 'app-user-manage',
  templateUrl: './manage-master.component.html',
  styleUrls: ['./manage-master.component.scss']
})
export class ManageMasterComponent implements OnInit, OnDestroy {

  @ViewChild('drawer') drawer: MatSidenav;

  formBase: Formbase<string>[] = [];
  form: FormGroup;
  settings$: Observable<any>;
  selected: any;

  dataSource: any;

  private _unsubscribeAll: Subject<any>;  

  constructor(
    private formBaseService: FormbaseService,
    private settingsService: SettingsService,
    private router: Router
  ) { 
    this._unsubscribeAll = new Subject();

    this.settings$ = formBaseService.layoutChangedObservable$
      .pipe(
        takeUntil(this._unsubscribeAll),
        map(layouts => {
          return layouts.filter(layout => layout.key === 'users')
        })
      );
  }

  ngOnInit(): void {

    this.settings$
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((layouts) => {
          if (layouts.length >= 1) {
            this.selectChanged(layouts[0]);
          }
    });

    this.settingsService.onDataChangedObservable$
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((result: any) => {
          console.log(result);
          this.dataSource = {
            data: result.data,
            pageIndex: result.pageIndex,
            pageSize: result.pageSize,
            totalRecord: result.totalRecord
          };
        });   
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  selectChanged(itm): void {
    this.selected = itm;
    if (this.selected) {
      // Setup model สำหรับสร้าง Reactive form
      this.formBase = this.selected.forms ? this.selected.forms : [];
      // Create new Reactive form จาก Model 
      this.form = this.formBaseService.toFormGroup(this.formBase);
      // อ่านข้อมูลมาแสดงในตาราง
      this.settingsService.getSettingsData(this.selected.key, 1, 10);
    }

  }

  onSubmit(): void {
    const payLoad = this.form.getRawValue();
    console.log(payLoad);
    if (payLoad) {
      this.settingsService.updateSettingsData(this.selected.key, payLoad)
        .subscribe((data) => {
          this.drawer.toggle();
        });
    }
  }

  onAddNew(): void {
    this.formBase = this.selected.forms ? this.selected.forms : [];
    this.form = this.formBaseService.toFormGroup(this.formBase);
    this.drawer.toggle();
  }

  onEdit(row): void {
    // console.log(row);
    this.settingsService.getSettingsDataByID(this.selected.key, row._id)
        .then((res) => {
          if (this.selected.key === 'layouts') {
            this.router.navigateByUrl(`settings/${row._id}`);
          } else {

            this.formBase = this.selected.forms ? this.selected.forms : [];
            this.form = this.formBaseService.toFormGroup(this.formBase, res.data);
            this.drawer.toggle();
          }
    });
  }

  onDelete(row): void {
    this.settingsService.deleteSettingsData(this.selected.key, row._id);
  }

  getServerData($event): void {
    // อ่านข้อมูลมาแสดงในตาราง
    this.settingsService.getSettingsData(this.selected.key, $event.pageIndex + 1, $event.pageSize);
  }

}
