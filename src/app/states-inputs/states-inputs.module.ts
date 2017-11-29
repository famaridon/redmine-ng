import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SiTextComponent} from './si-text/si-text.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [SiTextComponent],
  exports: [SiTextComponent]
})
export class StatesInputsModule { }
