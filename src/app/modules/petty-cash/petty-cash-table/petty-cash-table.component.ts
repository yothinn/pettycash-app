import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { PettyCashService } from 'src/app/services/petty-cash.service';
import { environment } from 'src/environments/environment';
import { AddItemComponent } from '../add-item/add-item.component';
import { Pc } from '../pc';


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

  data0: any;

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

  sumData: number = 0;

  pageNo: any = 1;
  pageSize: any = 10;

  deposit = 'เงินเข้า';
  withdraw = 'เงินออก';

  constructor(
    public dialog: MatDialog,
    private pettyCashService: PettyCashService,
    private auth: AuthService,
  ) {
    this.data0 = new Pc();
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
        this.employee = res;
        this.sumData = this.data0.findSum(res);
        console.log(this.data0.totalResult);
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