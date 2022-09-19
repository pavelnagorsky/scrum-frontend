import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AlertComponent } from './alert/alert.component';
import { DropdownDirective } from './directives/dropdown.directive';
import { ErrorModalDirective } from './directives/error-modal.directive';
import { NavbarTogglerDirective } from './directives/navbar-toggler.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    DropdownDirective,
    NavbarTogglerDirective,
    AlertComponent,
    LoadingSpinnerComponent,
    ErrorModalDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    DropdownDirective,
    AlertComponent,
    NavbarTogglerDirective,
    ErrorModalDirective,
    LoadingSpinnerComponent
  ]
})
export class SharedModule {}