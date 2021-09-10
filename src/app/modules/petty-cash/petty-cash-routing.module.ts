import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PettyCashComponent } from './petty-cash.component';

const routes: Routes = [
  {
    path: '',
    component: PettyCashComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PettyCashRoutingModule { }
