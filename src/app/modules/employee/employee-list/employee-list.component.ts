import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { EmployeeService } from '../../../services/employee.service';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, last, map, switchMap, takeUntil, tap } from 'rxjs/operators';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit, OnDestroy, AfterContentChecked, AfterViewInit {
  @ViewChild('searchContact') searchRef: ElementRef;
  @ViewChild('contactList') employeeRef: ElementRef;
  employeeList: Array<any>;
  activeEmployee: any;

  currentTabIndex: number = 0;
  currentPage = 1;

  // number of data that loaded
  readonly PAGESIZE = 25;
  // number of activity that showed
  readonly SHOWACNUM = 2;

  isSearching: boolean = false;


  // Dialog
  contactDialog: any;
  contactImportDialog: any;

  private _unsubscribeAll: Subject<any>;

  constructor(
    public dialog: MatDialog,
    private employeeService: EmployeeService,
    private ref: ChangeDetectorRef
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.loadContact();
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

  loadContact() {
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
      // tap(n => console.log(n)),
      debounceTime(300),
      filter((v: any) => {
        let maxPos = v.target.scrollHeight;
        let curPos = v.target.scrollTop + v.target.offsetHeight;

        // console.log(`maxPos : ${maxPos} cusPos: ${curPos}` );
        return (curPos >= (maxPos - 10));
      })
    );

    scrollContact$.pipe(takeUntil(this._unsubscribeAll))
      .subscribe((v: any) => {
        console.log(v);
        // this.currentPage++;
        // this.loadContacts();
        this.currentPage++;
        this.loadContact();
      });
  }

  onSearchContactEvent() {
    // Search contact
    let typeahead = fromEvent(this.searchRef.nativeElement, 'input').pipe(
      map((e:KeyboardEvent) => {
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
    // console.log(this.searchRef.nativeElement);

    // Reload contact
    this.loadContact();

  }
  public chooseContact(employeeList): void {
    this.activeEmployee = employeeList;
    console.log(this.activeEmployee)

    // this.loadTabData(this.currentTabIndex);
  }

  openAddEmployeeDialog(data): void {
    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      width: "400px",
      data: data
    });
  }
}