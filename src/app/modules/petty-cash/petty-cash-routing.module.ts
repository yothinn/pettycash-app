import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PettyCashComponent } from './petty-cash.component';
import { FormbaseService } from 'src/app/shared/components/formbase/formbase.service';

const routes: Routes = [
  {
    path: '',
    component: PettyCashComponent,
    resolve: [FormbaseService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PettyCashRoutingModule { }
