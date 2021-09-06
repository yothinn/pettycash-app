import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormbaseService } from 'src/app/shared/components/formbase/formbase.service';
import { SettingsService } from 'src/app/services/settings.service';
import { ManageMasterComponent } from './manage-master/manage-master.component';


const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    resolve: [FormbaseService, SettingsService]
  },
  {
    path: 'user-manage',
    component: ManageMasterComponent,
    resolve: [FormbaseService, SettingsService]
  }
];


@NgModule({
  declarations: [SettingsComponent, ManageMasterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [SettingsComponent]
})
export class SettingsModule { }
