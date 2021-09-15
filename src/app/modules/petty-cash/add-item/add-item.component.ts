import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { PettyCashService } from 'src/app/services/petty-cash.service';
import { Formbase } from 'src/app/shared/components/formbase/formbase';
import { FormbaseService } from 'src/app/shared/components/formbase/formbase.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {
  item: any;
  formBase: Formbase<string>[] = [];
  form: FormGroup;

  isChangeImage: boolean;
  imageFile: any;
  imageUrl: any;
  isNew: boolean;

  private _unsubscribeAll: Subject<any>;

  constructor(
    private pettyCashService: PettyCashService,
    private formBaseService: FormbaseService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddItemComponent>,
    private fb: FormBuilder,
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.formBaseService.layoutChangedObservable$
      .pipe(
        takeUntil(this._unsubscribeAll),
        map(layouts => { return layouts.filter(layout => layout.key === 'ListItems') })
      )
      .subscribe((layouts) => {
        console.log(layouts)
        this.item = layouts[0];
        this.formBase = this.item?.forms || [];

        this.formBase.map(item => {
          if ((item.key === 'created') ||
            (item.key === 'deposit') || (item.key === 'withdraw')) {
            item.disabled = ((this.data.isAdmin) || (this.data.isNew)) ? false : true;
          }
          return item;
        });

        this.form = this.formBaseService.toFormGroup(this.formBase, this.data.info);
      });

    console.log(this.data);
    if (this.data.isNew) {
      this.isNew = true;
      this.imageUrl = null;
    } else {
      this.isNew = false;
      this.imageUrl = this.data.info?.payInSlipUrl?.src || null;
    }

    this.isChangeImage = false;
  }


  selectedFile(event) {
    const file = event.target.files[0];
    // console.log(files);

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

  onSubmit(): void {
    let payload = this.form.getRawValue();
    console.log(payload);
    console.log(this.data.info._id);

    if (this.data.isNew) {
      payload.no = '';
      // console.log('create');  
      payload['customerId'] = this.data.info.customerId;
      this.pettyCashService.createListItem(payload).subscribe((res: any) => {
        this.dialogRef.close(res);
      })
    }
  }

}
