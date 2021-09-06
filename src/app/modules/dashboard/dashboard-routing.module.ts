import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormbaseService } from 'src/app/shared/components/formbase/formbase.service';
import { AuthGuard } from '../../services/auth.guard';
import { DashboardComponent } from './dashboard.component';


const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        // resolve: [FormbaseService],
        // canActivate: [AuthGuard]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
