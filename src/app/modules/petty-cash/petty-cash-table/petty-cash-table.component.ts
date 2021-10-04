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

  @Output() onTotalResult: EventEmitter<any> = new EventEmitter();

  user: any;
  employee: any;

  data0: PettyCash;

  table: any = {
    displayedColumns: [
      "no",
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
        "key": "no",
        "value": "เลขที่เอกสาร"
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

  sumData: number = 0;

  pageNo: any = 1;
  pageSize: any = 10 ;

  test: any [] ;

  constructor(
    public dialog: MatDialog,
    private pettyCashService: PettyCashService,
    private auth: AuthService,
  ) {
    this.data0 = new PettyCash();
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
    this.loadListItem()

  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  ngOnInit(): void {
    // this.auth.authUserStateObservable$
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe((user) => {
    //     this.user = user;
    //     console.log(this.user);
    //   });
  }

  loadListItem() {
    this.pettyCashService.getItemById(this.employeeId, this.pageNo, this.pageSize)
      .subscribe((res: any) => {
        this.employee = res;
        console.log(this.employee);
        this.data0.tab = res.data;
        this.sumData = this.data0.findSum();
      });
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
    this.pageNo = (event.pageIndex + 1);
    this.pageSize = event.pageSize;

    this.loadListItem();
  }

}