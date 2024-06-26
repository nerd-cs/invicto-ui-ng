import { Directive, Input, ElementRef, HostListener } from '@angular/core'

@Directive({
    selector: 'img[appImgFallback]'
})
export class ImgFallbackDirective {

    @Input() appImgFallback!: string;

    constructor(private eRef: ElementRef) { }

    @HostListener('error')
    loadFallbackOnError() {
        const element: HTMLImageElement = this.eRef.nativeElement as HTMLImageElement
        element.src = this.appImgFallback || 'https://via.placeholder.com/200'
    }

}
