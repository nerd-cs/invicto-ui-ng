import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CreateZoneDto, DoorService, ZoneService } from 'src/app/api_codegen';

@Component({
    selector: 'app-add-zone-door',
    templateUrl: './add-zone-door.component.html',
    styleUrls: ['./add-zone-door.component.scss']
})
export class AddZoneDoorComponent implements OnInit {

    searchKey: any;
    @Output() stepUpdate: EventEmitter<number> = new EventEmitter<number>();
    @Output() cancel: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() zoneData: EventEmitter<any> = new EventEmitter<any>();
    @Input() locationZoneDoors: any;

    location: any;
    zone: any = {
        name: 'All Zones',
        completed: false,
        zoneList: []
    };
    door: any = {
        name: 'All Doors',
        completed: false,
        doorList: []
    };
    allCompleteZone: boolean = false;
    allCompleteDoor: boolean = false;

    addZoneForm: FormGroup = new FormGroup({});

    constructor(
        private doorService: DoorService,
        private fb: FormBuilder,
        private zoneService: ZoneService,
        private toastr: ToastrService
    ) { }

    ngOnInit(): void {
        console.log('here----------- ', this.locationZoneDoors);
        this.location = this.locationZoneDoors.location;
        this.addZoneForm = this.fb.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            location: [this.location.name]
        });
        const zoneList = this.locationZoneDoors.zones.map((zone: any) => { return { id: zone.id, name: zone.name, completed: false } })
        this.zone.zoneList = zoneList;
    }

    ngAfterViewInit(): void {
        this.doorService.doorControllerGetAllForLocation(this.locationZoneDoors.location.id).subscribe(doors => {
            const doorList = doors.map(door => { return { id: door.id, name: door.name, completed: false } });
            this.door.doorList = doorList;
        })
    }

    next() {
        let zoneIds: any[] = [];
        this.zone.zoneList.filter((item: any) => item.completed).forEach((element: any) => {
            zoneIds.push(element.id);
        })
        let doorIds: any[] = [];
        this.door.doorList.filter((item: any) => item.completed).forEach((element: any) => {
            doorIds.push(element.id);
        })

        const body: CreateZoneDto = {
            name: this.addZoneForm.controls['name'].value,
            locationId: this.location.id,
            doorIds: doorIds,
            zoneIds: zoneIds,
            description: this.addZoneForm.controls['description'].value
        }
        // this.zoneService.zoneControllerCreateZone(body).subscribe(zone => {
        //     if (zone) {
        //         this.toastr.success(`New Zone created in ${this.location.name}`)
        //         this.stepUpdate.emit(2);
        //     }
        // })
        this.zoneData.emit(body);
        this.stepUpdate.emit(2);
    }
    close() {
        this.cancel.emit(true);
    }

    updateAllComplete(type: string) {
        if (type === 'zone') {
            this.allCompleteZone = this.zone.zoneList != null && this.zone.zoneList.every((t: any) => t.completed);
        } else if (type === 'door') {
            this.allCompleteDoor = this.door.doorList != null && this.door.doorList.every((t: any) => t.completed);
        }
    }

    someComplete(type: string): any {
        if (type === 'zone') {
            if (this.zone.zoneList == null) {
                return false;
            }
            return this.zone.zoneList.filter((t: any) => t.completed).length > 0 && !this.allCompleteZone;
        } else if (type === 'door') {
            if (this.door.doorList == null) {
                return false;
            }
            return this.door.doorList.filter((t: any) => t.completed).length > 0 && !this.allCompleteDoor;
        }
    }

    setAll(completed: boolean, type: string) {
        if (type === 'zone') {
            this.allCompleteZone = completed;
            if (this.zone.zoneList == null) {
                return;
            }
            this.zone.zoneList.forEach((t: any) => t.completed = completed);
        } else if (type === 'door') {
            this.allCompleteDoor = completed;
            if (this.door.doorList == null) {
                return;
            }
            this.door.doorList.forEach((t: any) => t.completed = completed);
        }
    }
}
