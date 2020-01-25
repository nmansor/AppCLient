import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import {MatDialog, MatDialogConfig, MatIconRegistry} from '@angular/material';

import * as Material from '@angular/material';

@NgModule({
  imports: [
      CommonModule, Material.MatDialogModule
    , Material.MatGridListModule, Material.MatFormFieldModule, Material.MatInputModule
    , Material.MatSelectModule, Material.MatOptionModule, Material.MatCardModule
    , Material.MatTableModule, Material.MatSortModule, Material.MatPaginatorModule
    , Material.MatButtonModule, Material.MatRadioModule, Material.MatCheckboxModule
    , Material.MatDatepickerModule, Material.MatNativeDateModule
    , Material.MatDialogModule,  Material.MatProgressSpinnerModule, Material.MatSlideToggleModule
    , Material.MatToolbarModule,  Material.MatSidenavModule, Material.MatIconModule
    , Material.MatListModule, Material.MatTabsModule
  ],

  exports: [
      CommonModule, Material.MatDialogModule
    , Material.MatGridListModule, Material.MatFormFieldModule, Material.MatInputModule
    , Material.MatSelectModule, Material.MatOptionModule, Material.MatCardModule
    , Material.MatTableModule, Material.MatSortModule, Material.MatPaginatorModule
    , Material.MatButtonModule, Material.MatRadioModule, Material.MatCheckboxModule
    , Material.MatDatepickerModule, Material.MatNativeDateModule
    , Material.MatDialogModule, Material.MatProgressSpinnerModule, Material.MatSlideToggleModule
    , Material.MatToolbarModule,  Material.MatSidenavModule, Material.MatIconModule
    , Material.MatListModule, Material.MatTabsModule
  ],

  declarations: []
})
export class MaterialModule { }
