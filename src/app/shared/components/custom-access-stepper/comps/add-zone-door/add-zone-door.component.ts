import { Component, EventEmitter, OnInit, Output } from '@angular/core';

export interface Zone {
    name: string;
    completed: boolean;
    zoneList: any[];
}
@Component({
    selector: 'app-add-zone-door',
    templateUrl: './add-zone-door.component.html',
    styleUrls: ['./add-zone-door.component.scss']
})
export class AddZoneDoorComponent implements OnInit {

    searchKey: any;
    @Output() stepUpdate: EventEmitter<number> = new EventEmitter<number>();
    @Output() cancel: EventEmitter<boolean> = new EventEmitter<boolean>();

    zone: Zone = {
        name: 'All doors',
        completed: false,
        zoneList: [
            { name: 'Garage', completed: false },
            { name: 'Lobby', completed: false },
            { name: '654-T', completed: false },
            { name: '658-B', completed: false },
            { name: 'Main Entrance', completed: false },
            { name: 'Shower', completed: false },
            { name: 'Gym', completed: false }
        ]
    };

    allComplete: boolean = false;

    constructor(
    ) { }

    ngOnInit(): void {
    }

    next() {
        this.stepUpdate.emit(2);
    }
    close() {
        this.cancel.emit(true);
    }

    updateAllComplete() {
        this.allComplete = this.zone.zoneList != null && this.zone.zoneList.every(t => t.completed);
    }

    someComplete(): boolean {
        if (this.zone.zoneList == null) {
            return false;
        }
        return this.zone.zoneList.filter(t => t.completed).length > 0 && !this.allComplete;
    }

    setAll(completed: boolean) {
        this.allComplete = completed;
        if (this.zone.zoneList == null) {
            return;
        }
        this.zone.zoneList.forEach(t => t.completed = completed);
    }
}
