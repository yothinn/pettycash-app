import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatTreeModule } from '@angular/material/tree';
import { MatRadioModule } from '@angular/material/radio';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatStepperModule } from '@angular/material/stepper';

import { NgxSpinnerModule } from 'ngx-spinner';

import { DirectivesModule } from './directives/directive.module';
import { PipesModule } from './pipes/pipe.module';
import { FormbaseComponent } from './components/formbase/formbase.component';
import { TablebaseComponent } from './components/formbase/tablebase.component';
import { SelecterComponent } from './components/selecter/selecter.component';

import { ChartsModule } from 'ng2-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxBarcode6Module } from 'ngx-barcode6';


import { VerticalTimelineModule } from 'angular-vertical-timeline';
import { MatChipsModule } from '@angular/material/chips';


@NgModule({
  declarations: [FormbaseComponent, TablebaseComponent, SelecterComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatBadgeModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatDialogModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTreeModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatStepperModule,
    MatChipsModule,

    NgxSpinnerModule,
    NgxBarcode6Module,
    ChartsModule,
    NgxChartsModule,

    VerticalTimelineModule,
    DirectivesModule,
    PipesModule,
  ],
  exports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatBadgeModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatSnackBarModule,
    MatTreeModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatStepperModule,
    MatChipsModule,
    MatSelectModule,

    NgxSpinnerModule,
    NgxBarcode6Module,

    ChartsModule,
    NgxChartsModule,

    VerticalTimelineModule,

    DirectivesModule,
    PipesModule,

    FormbaseComponent,
    TablebaseComponent,
    SelecterComponent
  ]
})
export class SharedModule { }
