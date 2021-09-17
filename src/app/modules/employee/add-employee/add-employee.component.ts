import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { EmployeeService } from 'src/app/services/employee.service';
import { Formbase } from 'src/app/shared/components/formbase/formbase';
import { FormbaseService } from 'src/app/shared/components/formbase/formbase.service';
import { Utils } from 'src/app/shared/utils';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit,OnDestroy {
  formBase: Formbase<string>[] = [];
  form: FormGroup;
  layout: any;

  private _unsubscribeAll: Subject<any>;

  constructor(
    private employeeService: EmployeeService,
    private formBaseService: FormbaseService ,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddEmployeeComponent>,
    private fb: FormBuilder,
    ) {
      this._unsubscribeAll = new Subject();
     }
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  ngOnInit(): void {
    this.formBaseService.layoutChangedObservable$
    .pipe(
      takeUntil(this._unsubscribeAll),
      map(layouts => { return layouts.filter(layout => layout.key === 'employee') })
    )
    .subscribe((res) => {
      console.log(res)
      this.layout = res[0];
      this.formBase = this.layout?.forms || [];
      this.form = this.formBaseService.toFormGroup(this.formBase, this.data);
      
    });
  }
  onClose() {
    this.dialogRef.close();
  }
  onSubmit(): void {
    let payLoad = this.form.getRawValue();

    console.log(payLoad);

    if (!this.data) {
      payLoad.id = Utils.generateGUID();
      payLoad.title = this.form.value.title;
      this.employeeService.createEmployee(payLoad).subscribe((res: any) => {
        console.log(res)
        this.dialogRef.close(res);
      })
      
    } else {
      payLoad.id = this.data.id;
      this.employeeService.updateEmployee(this.data._id,payLoad).subscribe(res=> {
        console.log(res);
        this.dialogRef.close(res);
      })
    }

  }
}
