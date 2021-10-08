import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { zip } from 'rxjs';
import { take } from 'rxjs/operators';
import { ZoneService, DoorService, UpdateZoneDto } from 'src/app/api_codegen';

@Component({
    selector: 'app-zone-confirm',
    templateUrl: './zone-confirm.component.html',
    styleUrls: ['./zone-confirm.component.scss']
})
export class ZoneConfirmComponent implements OnInit {

    @Output() cancel: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() save: EventEmitter<any> = new EventEmitter<any>();
    @Input() stepThreeData: any;

    isLoading = false;
    zoneForm: FormGroup = new FormGroup({ });
    allZoneDoors: any[] = [
        { name: 'Zones', zoneDoor: [] },
        { name: 'Doors', zoneDoor: [] }
    ];
    zones: any[] = [];

    constructor(
        private fb: FormBuilder,
        private zoneService: ZoneService,
        private doorService: DoorService,
        private toastr: ToastrService
    ) { }

    ngOnInit(): void {
        console.log('this.three', this.stepThreeData)
        const getAllZones = this.zoneService.zoneControllerGetAllForLocation(this.stepThreeData.location.id).pipe(take(1))
        const getAllDoors = this.doorService.doorControllerGetAllForLocation(this.stepThreeData.location.id).pipe(take(1))
        zip(getAllZones, getAllDoors).subscribe(res => {
            res[0].map((res: any) => { return { id: res.id, name: res.name } })
                .forEach((zone: any) => { this.allZoneDoors[0].zoneDoor.push(zone) });
            res[1].map((res: any) => { return { id: res.id, name: res.name } })
                .forEach((door: any) => { this.allZoneDoors[1].zoneDoor.push(door) });
            this.isLoading = false;
        })

        this.zoneForm = this.fb.group({
            name: [this.stepThreeData.name],
            location: [this.stepThreeData.location.name],
            zoneDoors: [[], Validators.required]
        })
    }

    get zoneArrayValue() {
        return this.zoneForm.controls['zoneDoors'].value;
    }

    removeChip(zone: any) {
        const newArray = this.zoneArrayValue.filter((item: any) => item !== zone);
        this.zoneForm.controls['zoneDoors'].setValue(newArray);
    }

    updateZone() {

        let selected = this.zoneForm.controls['zoneDoors'].value;
        // console.log('selected--------', selected)
        let zoneIds: any[] = [];
        let doorIds: any[] = [];

        this.allZoneDoors[0].zoneDoor.forEach((element: any) => {
            for (let index = 0; index < selected.length; index++) {
                if (selected[index] === element.name) {
                    zoneIds.push(element.id);
                    break;
                }
            }
        });
        this.allZoneDoors[1].zoneDoor.forEach((element: any) => {
            for (let index = 0; index < selected.length; index++) {
                if (selected[index] === element.name) {
                    doorIds.push(element.id);
                    break;
                }
            }
        });
        const emitData = {
            zoneIds: zoneIds,
            doorIds: doorIds
        }
        this.save.emit(emitData);
    }

    close() {
        this.cancel.emit(true);
    }

}
