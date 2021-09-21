import { AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
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
  user: any;
  employee: any;

  table: any = {
    displayedColumns: [
      "no",
      "created",
      "description",
      "amount",
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
        "value": "เงิน",
        "controlType": "number"
      },
      {
        "key": "placeOfUse",
        "value": "สถานที่ใช้งาน",
      },
    ],
    menus: [
      "edit", "download"
    ]
  };
  private _unsubscribeAll: Subject<any>;

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
      });
  }

  onEditRow(row): void {
    const dialogRef = this.dialog.open(AddItemComponent, {
      width: "40vw",
      height: "80vh",
      panelClass: 'custom-dialog-container',
      data: {
        isNew: false,
        isAdmin: this.auth.isAdmin(this.user),
        info: row
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadListItem();
    })
  }

  onDownloadRow(row): void {
    console.log(row);
    let fileName = row.no.replace("/", "_");
    window.open(`${environment.apiUrl}/shareholder/${fileName}.jpg`);
  }

}
