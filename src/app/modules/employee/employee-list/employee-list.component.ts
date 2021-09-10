import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialogAddEmployee(data): void {
    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      width: "400px",
      data:data
    });
    dialogRef.afterClosed().subscribe()
  }
}
