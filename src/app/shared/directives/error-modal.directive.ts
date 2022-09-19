import { Directive, ElementRef, HostListener } from '@angular/core';

import { clearError } from 'src/app/store/actions/project.actions';
import { AppState } from 'src/app/store/reducers';

@Directive({
  selector: '[appErrorModal]'
})
export class ErrorModalDirective {

  constructor(
    private elRef: ElementRef,
    private store: AppState
  ) { }

  // if click outside of error-modal content => clear error and close modal
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.store.dispatch(clearError())
    }
  }

}