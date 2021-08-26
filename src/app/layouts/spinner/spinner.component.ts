import { Component, Input, OnInit } from '@angular/core'

@Component({
    selector: 'app-spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

    @Input() size: string = 'sm'; // available options - sm, 2x, 3x
    @Input() color: string = 'blue'; // available options - dark, blue, white (default pink)
    @Input() background: string = ''; // available options - dark, blue, pink (default white)
    @Input() overlay = true;

    sizeClass = '';
    colorClass = '';
    backgroundColorClass = '';

    constructor() { }

    ngOnInit() {
        this.sizeClass = this.size ? `la-${this.size}` : ''
        this.colorClass = this.color ? `la-${this.color}` : ''
        this.backgroundColorClass = this.background ? `overlay-${this.background}` : ''
    }

}
