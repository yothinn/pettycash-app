import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { EmployeeService } from '../../../services/employee.service';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  employeeList: any;

  constructor(
    public dialog: MatDialog,
    private employeeService: EmployeeService
    ) { }

  ngOnInit(): void {
    this.employeeService.getEmployee().subscribe((res: any)=>{
      this.employeeList = res.data;
      
    });
  }

  openAddEmployeeDialog(data): void {
    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      width: "400px",
      data:data
    });
  }
}
