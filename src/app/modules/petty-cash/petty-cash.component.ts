import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { EmployeeService } from 'src/app/services/employee.service';
import { PettyCashService } from 'src/app/services/petty-cash.service';
import { AddEmployeeComponent } from '../employee/add-employee/add-employee.component';
import { AddItemComponent } from './add-item/add-item.component';

@Component({
  selector: 'app-petty-cash',
  templateUrl: './petty-cash.component.html',
  styleUrls: ['./petty-cash.component.scss']
})
export class PettyCashComponent implements OnInit, OnDestroy, AfterContentChecked, AfterViewInit {
  @ViewChild('searchContact') searchRef: ElementRef;
  @ViewChild('contactList') employeeRef: ElementRef;
  employeeList: Array<any>;
  activeEmployee: any;

  currentTabIndex: number = 0;
  currentPage = 1;

  // number of data that loaded
  readonly PAGESIZE = 5;
  // number of activity that showed
  readonly SHOWACNUM = 2;

  isSearching: boolean = false;


  // Dialog
  contactDialog: any;
  contactImportDialog: any;

  private _unsubscribeAll: Subject<any>;

  constructor(
    private pettyCashService: PettyCashService,
    public dialog: MatDialog,
    private employeeService: EmployeeService,
    private ref: ChangeDetectorRef
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.loadEmployee();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  ngAfterContentChecked(): void {
    this.ref.detectChanges();
  }

  ngAfterViewInit(): void {
    this.onSearchContactEvent()
    this.onScrollContactList();
  }

  loadEmployee() {
    this.employeeService.getEmployees(this.currentPage)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (this.currentPage === 1) {
          this.employeeList = res.data;
        } else {
          //Reload contact and concat to old
          if (res.data.length > 0) {
            this.employeeList = this.employeeList.concat(res.data);
          }

        }
      });
  }

  onScrollContactList() {
    let scrollContact$ = fromEvent(this.employeeRef.nativeElement, 'scroll').pipe(
      debounceTime(300),
      filter((v: any) => {
        let maxPos = v.target.scrollHeight;
        let curPos = v.target.scrollTop + v.target.offsetHeight;
        return (curPos >= (maxPos - 10));
      })
    );

    scrollContact$.pipe(takeUntil(this._unsubscribeAll))
      .subscribe((v: any) => {
        console.log(v);
        this.currentPage++;
        this.loadEmployee();
      });
  }

  onSearchContactEvent() {
    let typeahead = fromEvent(this.searchRef.nativeElement, 'input').pipe(
      map((e: KeyboardEvent) => {
        this.isSearching = true;
        return (e.target as HTMLInputElement).value
      }),
      filter(text => text.length >= 3),
      debounceTime(300),
      distinctUntilChanged(),
      // send request to search user
      tap(n => console.log(n)),
      switchMap(name => this.employeeService.searchEmployee(name))
    );

    typeahead.pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        v => {
          // TODO: update contact
          console.log(v);
          this.employeeList = v.data;
        },
        err => {
          console.log('contact searching error');
        }
      );
  }

  cancelSearch(): void {
    console.log('cancel search');
    this.isSearching = false;
    this.searchRef.nativeElement.value = '';

    // Reload contact
    this.loadEmployee();

  }

  chooseContact(data): void {
    this.activeEmployee = data;
    console.log(data)
  }

  openAddEmployeeDialog(data): void {
    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      width: "40vw",
      height: "80vh",
      data: data
    });
  }

  onDialogAddItem(): void {
    const dialogRef = this.dialog.open(AddItemComponent, {
      width: "40vw",
      height: "80vh",
      data: {
        isNew: true,
        info: {
          created: new Date(Date.now()).toISOString(),
          customerId: this.activeEmployee._id,
          no: '---------- AUTO GEN ----------'
        }
      }
    });
  }
}