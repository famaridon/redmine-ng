import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SiTextComponent} from './components/si-text/si-text.component';
import {FormsModule} from '@angular/forms';
import {SiSelectComponent} from './components/si-select/si-select.component';
import {SiAutoFocusDirective} from './directives/autofocus/autofocus.directive';
import {SiAutoSizeDirective} from './directives/autosize/auto-size.directive';
import { SiTextareaComponent } from './components/si-textarea/si-textarea.component';

@NgModule({

  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    SiAutoFocusDirective,
    SiAutoSizeDirective,

    SiTextComponent,
    SiSelectComponent,
    SiTextareaComponent

  ],
  exports: [
    SiAutoFocusDirective,

    SiTextComponent,
    SiSelectComponent,
    SiTextareaComponent
  ]
})
export class StatesInputsModule {
}

export interface IOption {
  getDisplayLabel(): string;

  getComparableValue(): any;
}
