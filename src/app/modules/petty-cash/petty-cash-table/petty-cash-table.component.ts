import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AlertService } from 'src/app/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { PettyCashService } from 'src/app/services/petty-cash.service';
import { environment } from 'src/environments/environment';
import { AddItemComponent } from '../add-item/add-item.component';

@Component({
  selector: 'app-petty-cash-table',
  templateUrl: './petty-cash-table.component.html',
  styleUrls: ['./petty-cash-table.component.scss']
})
export class PettyCashTableComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @Input() employeeId: string;
  @Input() data: any;

  @Output() onTotalResult: EventEmitter<any> = new EventEmitter();

  user: any;
  employee: any;

  table: any = {
    displayedColumns: [
      "no",
      "created",
      "description",
      "amount",
      "status",
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
        "key": "no",
        "value": "เลขที่เอกสาร"
      },
      {
        "key": "description",
        "value": "รายการ"
      },
      {
        "key": "amount",
        "value": "จำนวนเงิน",
        "controlType": "number"
      },
      {
        "key": "status",
        "value": "สถานะ",
      },
      {
        "key": "placeOfUse",
        "value": "สถานที่ใช้งาน",
      },
    ],
    menus: [
      "download"
    ]
  };

  private _unsubscribeAll: Subject<any>;

  totalAmountIn: number = 0;
  totalAmountOut: number = 0;
  totalResult: number = 0;

  pageNo: any = 1;
  pageSize: any = 10;

  deposit = 'เงินเข้า';
  withdraw = 'เงินออก';

  constructor(
    private alertService: AlertService,
    public dialog: MatDialog,
    private pettyCashService: PettyCashService,
    private auth: AuthService,
    private spinner: NgxSpinnerService,
  ) {
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
    console.log(this.employeeId)
    this.loadListItem()

  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  ngOnInit(): void {
    this.auth.authUserStateObservable$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((user) => {
        this.user = user;
        console.log(this.user);
      });
  }

  loadListItem() {
    this.pettyCashService.getListItemByemployee(this.pageNo, this.pageSize, this.employeeId)
      .subscribe((res: any) => {
        console.log(res)
        this.employee = res;
        this.findsum(this.employee);
      });
  }

  // async loadData(): Promise<void>{
  //   this.spinner.show();
  //   try {
  //     this.employeePage = await this.employee.excute(this.request);
  //     this.employee.resetPage();
  //   } catch (error) {

  //   }finally {
  //     this.spinner.hide();
  //   }
  //   this.spinner.hide();
  // }

  // onEditRow(row): void {
  //   const dialogRef = this.dialog.open(AddItemComponent, {
  //     width: "40vw",
  //     height: "80vh",
  //     panelClass: 'custom-dialog-container',
  //     data: {
  //       isNew: false,
  //       isAdmin: this.auth.isAdmin(this.user),
  //       info: row
  //     }
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     this.loadListItem();
  //   })
  // }

  onDownloadRow(row): void {
    console.log(row);
    if (row.imageUrl) {
      window.open(`${environment.apiUrl}/api/${row.imageUrl.src}`);
    } else {
      alert('No Image');
    }
  }

  findsum(data) {
    this.totalAmountIn = 0;
    this.totalAmountOut = 0;

    let sumIn = data.data.filter(res => {
      return res.status === this.deposit;
    })

    let sumOut = data.data.filter(res => {
      return res.status === this.withdraw;
    })

    console.log(sumIn, sumOut)

    sumIn.map(item => {
      this.totalAmountIn += item.amount;
    });
    sumOut.map(item => {
      this.totalAmountOut += item.amount;
    });

    this.totalResult = this.totalAmountIn - this.totalAmountOut;
    console.log(this.totalResult);
  }

  onDialogAddItem(): void {
    const dialogRef = this.dialog.open(AddItemComponent, {
      width: "40vw",
      height: "90vh",
      data: {
        isNew: true,
        info: {
          created: new Date(Date.now()).toISOString(),
          customerId: this.data._id,
        }
      }
    });
  }

  onPageEventChanged(event: any): void {
    console.log(event);
    this.pageNo = (event.pageIndex + 1);
    this.pageSize = event.pageSize;

    this.loadListItem();
  }
}
