import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeeComponent } from '../employee/add-employee/add-employee.component';

@Component({
  selector: 'app-petty-cash',
  templateUrl: './petty-cash.component.html',
  styleUrls: ['./petty-cash.component.scss']
})
export class PettyCashComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  
}
