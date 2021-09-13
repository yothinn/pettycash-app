import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/services/employee.service';
import { AddItemComponent } from './add-item/add-item.component';

@Component({
  selector: 'app-petty-cash',
  templateUrl: './petty-cash.component.html',
  styleUrls: ['./petty-cash.component.scss']
})
export class PettyCashComponent implements OnInit {
  activeEmployee: any;
  // employeeList: any;

  constructor(
    public dialog: MatDialog,
    private employeeService: EmployeeService,
    ) { }

  ngOnInit(): void {
  }

  onDialogAddItem(data): void {
    const dialogRef = this.dialog.open(AddItemComponent, {
      width: "400px",
      data:data
    });
    dialogRef.afterClosed().subscribe()
  }
  // chooseContact(employeeList): void {
  //   this.activeEmployee = employeeList;
  //   console.log(this.activeEmployee)

  //   // this.loadTabData(this.currentTabIndex);
  // }
}
