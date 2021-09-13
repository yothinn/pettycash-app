import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PettyCashComponent } from './petty-cash.component';
import { AddItemComponent } from './add-item/add-item.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PettyCashTableComponent } from './petty-cash-table/petty-cash-table.component';
import { EmployeeModule } from 'src/app/modules/employee/employee.module';
import { PettyCashRoutingModule } from './petty-cash-routing.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [PettyCashComponent,AddItemComponent, PettyCashTableComponent],
  imports: [
    CommonModule,
    SharedModule,
    EmployeeModule,
    PettyCashRoutingModule,
    HttpClientModule
  ]
})
export class PettyCashModule { }
