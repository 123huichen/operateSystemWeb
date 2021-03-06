import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormComponent } from './containers/dynamic-form/dynamic-form.component';


import { FormButtonComponent } from './containers/dynamic-form/components/form-button.component';
import { FormInputComponent } from './containers/dynamic-form/components/form-input.component';
import { FormSelectComponent } from './containers/dynamic-form/components/form-select.component';


import { DynamicFieldDirective } from './containers/dynamic-form/components/dynamic-field/dynamic-field.directive'
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations : [DynamicFormComponent,FormButtonComponent,FormInputComponent,FormSelectComponent,DynamicFieldDirective],
  exports : [DynamicFormComponent]
})
export class DynamicFormModule {}