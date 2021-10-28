import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { PettyCashService } from 'src/app/services/petty-cash.service';
import { environment } from 'src/environments/environment';
import { AddItemComponent } from '../add-item/add-item.component';
import { PettyCash } from '../pettyCash';


@Component({
  selector: 'app-petty-cash-table',
  templateUrl: './petty-cash-table.component.html',
  styleUrls: ['./petty-cash-table.component.scss']
})
export class PettyCashTableComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @Input() employeeId: string;
  @Input() data: any;

  user: any;
  listItem: Array<any>;

  pettyCashData: PettyCash;

  table: any = {
    displayedColumns: [
      "newId",
      "created",
      "description",
      "amountIn",
      "amountOut",
      "placeOfUse",
      "menu"
    ],
    columns: [
      {
        "key": "created",
        "value": "วันที่",
        "controlType": "datetime"
      },
      {
        "key": "newId",
        "value": "เลขที่เอกสาร",
      },
      {
        "key": "description",
        "value": "รายการ"
      },
      {
        "key": "amountIn",
        "value": "เงินเข้า",
        "controlType": "number"
      },
      {
        "key": 'amountOut',
        "value": "เงินออก",
        "controlType": "number"
      },
      {
        "key": "placeOfUse",
        "value": "สถานที่ใช้งาน",
      },
    ],
    menus: [
      // "edit",
      "download"
    ]
  };

  private _unsubscribeAll: Subject<any>;

  // sumData: number = 0;

  pageNo = 1;
  pageSize = 10;

  test: any;

  totalAmountIn: number = 0;
  totalAmountOut: number = 0;
  totalResult: number;

  constructor(
    public dialog: MatDialog,
    private pettyCashService: PettyCashService,
    private auth: AuthService,
  ) {
    this.pettyCashData = new PettyCash();
    this._unsubscribeAll = new Subject();

  }
  ngAfterViewInit(): void {
    this.pettyCashService.onDataChangedObservable$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(res => {
        this.loadListItem();
      })
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes);
    this.pageNo = 1;
    this.pageSize = 10;
    this.loadListItem();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  ngOnInit(): void {
  }

  loadListItem() {
    this.pettyCashService.getItemById(this.employeeId, this.pageNo, this.pageSize)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        this.listItem = res;
        console.log(this.listItem);
      });
    this.pettyCashService.getTest()
      .subscribe((res: any) => {
        this.test = res.data;
        // console.log(this.test);
        this.onFindSum(res.data)
      })
  }

  // sum amountIn and amountOut
  onFindSum(data) {
    this.totalAmountIn = 0;
    this.totalAmountOut = 0;

    let sumIn = data.amountIn.find(i => i._id === this.employeeId);
    if (sumIn) {
      this.totalAmountIn = sumIn.total;
    } else {
      null
    }

    let sumOut = data.amountOut.find(i => i._id === this.employeeId);
    if (sumOut) {
      this.totalAmountOut = sumOut.total;
    } else {
      null
    }

    this.totalResult = this.totalAmountIn - this.totalAmountOut;
  }

  // onEditRow(row): void {
  //   const dialogRef = this.dialog.open(AddItemComponent, {
  //     width: "40vw",
  //     height: "80vh",
  //     panelClass: 'custom-dialog-container',
  //     data: {
  //       isNew: false,
  //       info: row
  //     }
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     this.loadListItem();
  //   })
  // }

  // show image on blank tab
  onDownloadRow(row): void {
    console.log(row);
    if (row.imageUrl) {
      window.open(`${environment.apiUrl}/api/${row.imageUrl.src}`);
    } else {
      alert('No Image');
    }
  }


  onDialogAddItem(): void {
    const dialogRef = this.dialog.open(AddItemComponent, {
      width: "40vw",
      height: "90vh",
      data: {
        isNew: true,
        info: {
          created: new Date(Date.now()).toISOString(),
          customerId: this.employeeId,

        }
      }
    });
  }

  onPageEventChanged(event: any): void {
    this.pageNo = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadListItem();
  }

  // importExcel(event) {
  //   const file = event.target.files[0];
  //   console.log(file);
  //   const form = new FormData();
  //   form.append('files', file);
  //   console.log(form);

  //   this.pettyCashService.uploadfile(form)
  //     .subscribe((res: any) => {
  //       console.log(res);
  //       this.loadListItem();
  //     })
  // }

}