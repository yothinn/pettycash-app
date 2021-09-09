import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [ EmployeeListComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [EmployeeListComponent]
})
export class EmployeeModule { }
