import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './components/table/table.component';
import { RowComponent } from './components/row/row.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TableComponent, RowComponent],
  exports:[TableComponent, RowComponent]
})
export class TreeTableModule { }
