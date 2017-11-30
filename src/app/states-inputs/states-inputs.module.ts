import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SiTextComponent} from './si-text/si-text.component';
import {FormsModule} from '@angular/forms';
import { SiSelectComponent } from './si-select/si-select.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [SiTextComponent, SiSelectComponent],
  exports: [SiTextComponent]
})
export class StatesInputsModule { }
