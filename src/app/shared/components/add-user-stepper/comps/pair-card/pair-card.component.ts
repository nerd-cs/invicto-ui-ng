import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-pair-card',
    templateUrl: './pair-card.component.html',
    styleUrls: ['./pair-card.component.scss']
})
export class PairCardComponent implements OnInit {

    @Output() cancel: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() stepUpdate: EventEmitter<number> = new EventEmitter<number>();

    constructor() { }

    ngOnInit(): void {
    }

    close() {
        this.cancel.emit(true);
    }
    gotoStep(step: number) {
        this.stepUpdate.emit(step);
    }

}
