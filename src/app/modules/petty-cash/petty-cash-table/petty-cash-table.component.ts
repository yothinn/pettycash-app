import { AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-petty-cash-table',
  templateUrl: './petty-cash-table.component.html',
  styleUrls: ['./petty-cash-table.component.scss']
})
export class PettyCashTableComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @Input() employeeId: string;
  certs: any;
  user: any;

  table: any = {
    displayedColumns: [
      "created",
      "no",
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

  constructor() { }
  ngAfterViewInit(): void {

  }
  ngOnChanges(changes: SimpleChanges): void {
    
  }
  ngOnDestroy(): void {
  
  }

  ngOnInit(): void {
  }

}
