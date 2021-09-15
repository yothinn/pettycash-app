import { AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PettyCashService } from 'src/app/services/petty-cash.service';

@Component({
  selector: 'app-petty-cash-table',
  templateUrl: './petty-cash-table.component.html',
  styleUrls: ['./petty-cash-table.component.scss']
})
export class PettyCashTableComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @Input() employeeId: string;
  user: any;

  table: any = {
    displayedColumns: [
      "no",
      "created",
      "description",
      "deposit",
      "withdraw",
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
        "key": "deposit",
        "value": "เงินเข้า",
        "controlType": "number"
      },
      {
        "key": "withdraw",
        "value": "เงินออก",
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

  constructor(private pettyCashService: PettyCashService,) {
    this._unsubscribeAll = new Subject();
   }
  ngAfterViewInit(): void {
    this.pettyCashService.onDataChangedObservable$
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(result => {
          this.loadListItem();
        })

  }
  ngOnChanges(changes: SimpleChanges): void {
    
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  ngOnInit(): void {
  }

  loadListItem() {
    this.pettyCashService.getListItemByemployee(1, 10, this.employeeId)
        .subscribe((res: any) => {
          console.log(res);
          this.user = res;
        });
  }

}
