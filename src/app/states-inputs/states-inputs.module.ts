import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SiTextComponent} from './si-text/si-text.component';
import {FormsModule} from '@angular/forms';
import {SiSelectComponent} from './si-select/si-select.component';
import {AutofocusDirective} from './directives/autofocus/autofocus.directive';

@NgModule({

  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    AutofocusDirective,

    SiTextComponent,
    SiSelectComponent
  ],
  exports: [
    AutofocusDirective,

    SiTextComponent,
    SiSelectComponent
  ]
})
export class StatesInputsModule {
}

export interface IOption {
  getDisplayLabel(): string;

  getComparableValue(): any;
}
