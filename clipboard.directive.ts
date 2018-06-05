import {Directive, ElementRef, HostListener, Input, OnDestroy} from '@angular/core';
import ClipboardAction from './clipboardAction';

@Directive({
  selector: '[appClipboard]',
})
export class ClipboardDirective implements OnDestroy {

  clipboardAction: any;

  constructor(private el: ElementRef) {
  }

  @Input('appClipboard') appClipboard: string;

  @HostListener('click') onClick() {
    if (this.clipboardAction) {
      this.clipboardAction = null;
    }

    this.clipboardAction = new ClipboardAction({
      action: 'copy',
      target: this.el.nativeElement,
      text: this.appClipboard || "",
      container: document.body,
      trigger: null,
      success: () => {
        this.el.nativeElement.classList.add("tooltipped", "tooltipped-n");
        this.el.nativeElement.setAttribute('aria-label', 'Copied!');
      },
      error: () => {
      }
    });
  }

  @HostListener('mouseleave') onMouseLeave() {
    // this.el.nativeElement.classList.remove("tooltipped", "tooltipped-n");
    // this.el.nativeElement.removeAttribute('aria-label', 'Copied!');
  }

  ngOnDestroy(): void {
    if (this.clipboardAction) {
      this.clipboardAction.destroy();
      this.clipboardAction = null;
    }
  }

}
