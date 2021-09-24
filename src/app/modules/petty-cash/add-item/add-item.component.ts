import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { forkJoin, of, Subject } from 'rxjs';
import { concatMap, map, takeUntil } from 'rxjs/operators';
import { PettyCashService } from 'src/app/services/petty-cash.service';
import { Formbase } from 'src/app/shared/components/formbase/formbase';
import { FormbaseService } from 'src/app/shared/components/formbase/formbase.service';
import { environment } from 'src/environments/environment';
import { UploadService } from 'src/app/services/upload.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {
  readonly UPLOADSUB_PETTYCASH = "pettyCashs";

  item: any;
  formBase: Formbase<string>[] = [];
  form: FormGroup;

  isChangeImage: boolean;
  imageFile: any;
  imageUrl: any;
  isNew: boolean;

  status: Array<any> = [{ name: "เงินเข้า" }, { name: "เงินออก" }];

  private _unsubscribeAll: Subject<any>;

  constructor(
    private pettyCashService: PettyCashService,
    private employeeService: EmployeeService,
    private formBaseService: FormbaseService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddItemComponent>,
    private fb: FormBuilder,
    private uploadService: UploadService,
  ) {
    this._unsubscribeAll = new Subject();
    
  }

  ngOnInit(): void {
    this.formBaseService.layoutChangedObservable$
      .pipe(
        takeUntil(this._unsubscribeAll),
        map(layouts => { return layouts.filter(layout => layout.key === 'ListItem') })
      )
      .subscribe((layouts) => {
        console.log(layouts)
        this.item = layouts[0];
        this.formBase = this.item?.forms || [];
        this.form = this.formBaseService.toFormGroup(this.formBase, this.data.info);
        this.form.addControl('status', this.fb.control(this.data?.status || ''));
        this.form.addControl('amount', this.fb.control(this.data?.amount || ''));
      });
    console.log(this.data);
    if (this.data.isNew) {
      this.isNew = true;
      this.imageUrl = null;
    } else {
      this.isNew = false;
    }

    this.isChangeImage = false;
  }


  selectedFile(event) {
    const file = event.target.files[0];
    let maxSize = environment.maxupload;         // size in MB
    let fileSize = file.size / 1024 / 1024            // convert to MB
    if (fileSize >= maxSize) {
      // TODO : how to manage error !!!!
      throw new Error(`File Size is too large. Allowed file size is ${maxSize}MB`);
    }

    this.isChangeImage = true;
    this.imageFile = file;

    let fileReader = new FileReader();
    fileReader.onload = (event) => {
      this.imageUrl = fileReader.result;
      console.log(this.imageUrl);
    };
    fileReader.readAsDataURL(file);
  }

  onClose() {
    this.dialogRef.close();
  }

  onSubmit(): void {
    let payload = this.form.getRawValue();
    console.log(payload);
    console.log(this.data.info._id);

    let upload$;
    if (this.isChangeImage) {

      const formData = new FormData();
      formData.append('file', this.imageFile);

      console.log(this.isChangeImage);
      upload$ = this.uploadService.uploadFile(this.UPLOADSUB_PETTYCASH, formData);
    } else {
      upload$ = of({});
    }
    forkJoin({
      upload: upload$
    }).pipe(
      takeUntil(this._unsubscribeAll),
      concatMap((result: any) => {
        console.log(result);
        if (this.data.isNew) {
          // console.log('create');  
          payload['id'] = this.data.info.customerId;
          payload['imageUrl'] = result.upload;
          return this.pettyCashService.createListItem(payload);
        }
      }),
    ).subscribe(res => {
      console.log(res);
      this.dialogRef.close(true);
    });
  }
}