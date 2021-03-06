import { Directive, Input, EventEmitter, ElementRef, Renderer, Inject, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Directive({
  selector: '[appFocus]'
})
export class FocusDirective implements OnInit, OnDestroy {
  sub: Subscription;
  @Input('appFocus') appFocus: EventEmitter<boolean>;

  constructor( @Inject(ElementRef) private element: ElementRef, private renderer: Renderer) {
  }

  ngOnInit() {
    // console.log('subscribing!!');
    this.sub = this.appFocus.subscribe(event => {
      // this.renderer.invokeElementMethod(this.element.nativeElement, 'focus', []);
      // this.element.nativeElement.focus();
      // TODO: RC Check type of nativeElement
      this.renderer.invokeElementMethod(this.element.nativeElement, 'focus');
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
