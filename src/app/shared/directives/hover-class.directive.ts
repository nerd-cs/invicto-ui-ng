import { Directive, ElementRef, HostListener, Input, HostBinding } from '@angular/core'

@Directive({
    selector: '[appHoverClass]'
})
export class HoverClassDirective {

    constructor() { }

    @HostBinding('class.active') active!: boolean;
    @HostListener('mouseover') activated() {
        this.active = true;
    }

    @HostListener('mouseleave') deactivated() {
        this.active = false;
    }
}
