import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EmployeeService } from 'src/app/services/employee.service';
import { PettyCashService } from 'src/app/services/petty-cash.service';
import { PettyCash } from '../pettyCash';

@Component({
  selector: 'app-list-summary',
  templateUrl: './list-summary.component.html',
  styleUrls: ['./list-summary.component.scss']
})
export class ListSummaryComponent implements OnInit, OnDestroy, AfterContentChecked , OnChanges, AfterViewInit{
  @Input() testId: string;

  list: any;
  testData: PettyCash;

  private _unsubscribeAll: Subject<any>;

  test: any;
  testList: any ;

  sumIn: number = 0;
  sumOut: number = 0;
  totalResult: number ;

  constructor(
    private pettyCashService: PettyCashService,
    public dialog: MatDialog,
    private employeeService: EmployeeService,
    private ref: ChangeDetectorRef
  ) {
    this._unsubscribeAll = new Subject();
    this.testData = new PettyCash();
  }
  ngAfterViewInit(): void {
    this.pettyCashService.onDataChangedObservable$
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(res => {
      this.loadList();
    })
  
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.loadList();
  }

  ngAfterContentChecked(): void {
    this.ref.detectChanges();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  ngOnInit(): void {
    // this.loadEmployee();
    // this.loadListItem();
  
  }

  loadList() {
    this.pettyCashService.getTest()
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((res: any) => {
      this.test = res.data;
      this. sumValue(res.data);
    })
  }


  // sum amountIn and amountOut
  sumValue(data) {
    this.sumIn = 0;
    this.sumOut = 0;
    this.totalResult = 0;

    let sumIn = data.amountIn.find(i => i._id === this.testId);
    if (sumIn) {
      this.sumIn = sumIn.total;
    } else {
      null
    }
    console.log(this.sumIn)

    let sumOut = data.amountOut.find(i => i._id === this.testId);
    if (sumOut) {
      this.sumOut = sumOut.total;
    } else {
      null
    }
    console.log(this.sumOut)

    this.totalResult = this.sumIn - this.sumOut;

  }
  
}
