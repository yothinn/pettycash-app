import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerInfoComponent } from './customer-info/customer-info.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { SaleOrderComponent } from './sale-order/sale-order.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    CustomerInfoComponent, 
    ContactInfoComponent, 
    SaleOrderComponent, 
    ProfileComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    CustomerInfoComponent,
    ContactInfoComponent,
    SaleOrderComponent,
    ProfileComponent
  ],
})
export class ShareComponentsModule { }
