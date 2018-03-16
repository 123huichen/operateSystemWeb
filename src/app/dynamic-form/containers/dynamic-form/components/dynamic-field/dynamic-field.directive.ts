import { ComponentFactoryResolver, Directive, Input, OnInit, 
    ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormButtonComponent } from '../../components/form-button.component';
import { FormInputComponent } from '../../components/form-input.component';
import { FormSelectComponent } from '../../components/form-select.component';
const components = {
    button: FormButtonComponent,
    input: FormInputComponent,
    select: FormSelectComponent
  };
@Directive({
selector: '[dynamicField]'
})
export class DynamicFieldDirective implements OnInit {
@Input()
config;

@Input()
group: FormGroup;

component: any
constructor(
private resolver: ComponentFactoryResolver,
private container: ViewContainerRef
) {}

ngOnInit() {
    const component = components[this.config.type];
    const factory = this.resolver.resolveComponentFactory<any>(component);
    this.component = this.container.createComponent(factory);
    this.component.instance.config = this.config;
    this.component.instance.group = this.group;
}
}