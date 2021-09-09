import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PettyCashComponent } from './petty-cash.component';
import { AddItemComponent } from './add-item/add-item.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { PettyCashTableComponent } from './petty-cash-table/petty-cash-table.component';
import { EmployeeModule } from 'src/app/modules/employee/employee.module';

const routes: Routes = [
  {
    path: '',
    component: PettyCashComponent,
  }
];

@NgModule({
  declarations: [PettyCashComponent,AddItemComponent, PettyCashTableComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    EmployeeModule
  ]
})
export class PettyCashModule { }
