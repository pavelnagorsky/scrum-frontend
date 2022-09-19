import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appNavbarToggler]'
})
export class NavbarTogglerDirective {

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  // collapsed при закрытой панели и наоборот
  @HostBinding('class.collapsed') collapseMode: boolean = true;
  private readonly timeout = 300;

  // открытие или закрытие панели navbar
  @HostListener('click') toggleOpen() {
    this.collapseMode = !this.collapseMode;
    if (this.collapseMode) {  // свернуть navbar
      this.renderer.setAttribute(this.elRef.nativeElement, 'aria-expanded', 'false');
      this.renderer.removeClass(this.elRef.nativeElement.nextElementSibling, "collapse");
      this.renderer.addClass(this.elRef.nativeElement.nextElementSibling, "collapsing");
      setTimeout(() => {
        this.renderer.removeClass(this.elRef.nativeElement.nextElementSibling, "collapsing");
        this.renderer.addClass(this.elRef.nativeElement.nextElementSibling, "collapse");
        this.renderer.removeClass(this.elRef.nativeElement.nextElementSibling, "show");
      }, this.timeout);
    } else {  // развернуть navbar
      this.renderer.setAttribute(this.elRef.nativeElement, 'aria-expanded', 'true');
      this.renderer.addClass(this.elRef.nativeElement.nextElementSibling, "collapse");
      this.renderer.addClass(this.elRef.nativeElement.nextElementSibling, "show");
    }
  }

}
