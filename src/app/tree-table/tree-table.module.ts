import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { RowComponent } from './row/row.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TableComponent, RowComponent],
  exports:[TableComponent, RowComponent]
})
export class TreeTableModule { }
