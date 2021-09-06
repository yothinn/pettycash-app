import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatProgressBarModule } from '@angular/material/progress-bar';

import { ProgressbarComponent } from './progressbar.component';

@NgModule({
  declarations: [ProgressbarComponent],
  imports: [
    CommonModule,
    MatProgressBarModule
  ],
  exports: [ProgressbarComponent]
})
export class ProgressbarModule { }
