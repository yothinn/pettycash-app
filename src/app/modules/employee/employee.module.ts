import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddEmployeeComponent } from './add-employee/add-employee.component';



@NgModule({
  declarations: [ AddEmployeeComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[AddEmployeeComponent]
})
export class EmployeeModule { }
