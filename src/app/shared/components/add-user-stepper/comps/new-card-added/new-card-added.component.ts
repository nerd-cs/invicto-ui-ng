import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-new-card-added',
    templateUrl: './new-card-added.component.html',
    styleUrls: ['./new-card-added.component.scss']
})
export class NewCardAddedComponent implements OnInit {

    @Output() cancel: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() send: EventEmitter<boolean> = new EventEmitter<boolean>();
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

    sendLater() {
        this.send.emit(false);
    }
    sendInvitation() {
        this.send.emit(true);
    }
}
