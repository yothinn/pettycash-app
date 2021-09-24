import { AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
  @Output() public totalResult: number = 0;

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

  deposit = 'เงินเข้า';
  withdraw = 'เงินออก';

  constructor(
    private alertService: AlertService,
    public dialog: MatDialog,
    private pettyCashService: PettyCashService,
    private auth: AuthService
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
    this.pettyCashService.getListItemByemployee(1, 25, this.employeeId)
      .subscribe((res: any) => {
        console.log(res)
        this.employee = res;
        this.findsum(this.employee);
      });
  }

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

    if (sumOut.length === 0) {
      console.log('No Data')

    }else if (sumIn.length === 0){
      this.totalAmountOut = sumOut.map(item => item.amount).reduce((prev, next) => prev + next);
      
    }else {
      this.totalAmountIn = sumIn.map(item => item.amount).reduce((prev, next) => prev + next);
      this.totalAmountOut = sumOut.map(item => item.amount).reduce((prev, next) => prev + next);
    }

    this.totalResult = this.totalAmountIn - this.totalAmountOut;



    // if (sumOut.length === 0) {
    //   sumIn.forEach(a => this.totalAmountIn += a.amount);
    //   this.totalResult = this.totalAmountIn
    // } else {
    //   sumIn.forEach(a => this.totalAmountIn += a.amount);
    //   sumOut.forEach(a => this.totalAmountIn -= a.amount);
    //   this.totalResult = this.totalAmountIn - this.totalAmountOut;
    // }
  }


}
