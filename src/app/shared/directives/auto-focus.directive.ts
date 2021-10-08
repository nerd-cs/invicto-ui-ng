import { ChangeDetectorRef, Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[appAutoFocus]'
})
export class AutoFocusDirective {
    constructor(
        private elementRef: ElementRef,
        private cdRef: ChangeDetectorRef) { }

    ngAfterViewInit(): void {
        this.elementRef.nativeElement.focus();
        this.cdRef.detectChanges();
    }
}
