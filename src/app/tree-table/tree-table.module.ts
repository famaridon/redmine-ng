import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './components/table/table.component';
import { RowComponent } from './components/row/row.component';
import { TtToggleRowDirective } from './directives/tt-toggle-row.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TableComponent, RowComponent, TtToggleRowDirective],
  exports:[TableComponent, RowComponent]
})
export class TreeTableModule { }
