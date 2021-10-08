import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { zip } from 'rxjs';
import { take } from 'rxjs/operators';
import { DoorService, UpdateZoneDto, ZoneService } from 'src/app/api_codegen';

@Component({
    selector: 'app-zone-panel',
    templateUrl: './zone-panel.component.html',
    styleUrls: ['./zone-panel.component.scss']
})
export class ZonePanelComponent implements OnInit {

    isLoading = false;
    zoneForm: FormGroup = new FormGroup({ });
    allZoneDoors: any[] = [
        { name: 'Zones', zoneDoor: [] },
        { name: 'Doors', zoneDoor: [] }
    ];
    zones: any[] = [];

    constructor(
        private dialogRef: MatDialogRef<ZonePanelComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder,
        private zoneService: ZoneService,
        private doorService: DoorService,
        private toastr: ToastrService
    ) {
        this.isLoading = true;
        const getAllZones = this.zoneService.zoneControllerGetAllForLocation(data.zoneData.location.id).pipe(take(1))
        const getAllDoors = this.doorService.doorControllerGetAllForLocation(data.zoneData.location.id).pipe(take(1))
        zip(getAllZones, getAllDoors).subscribe(res => {
            res[0].map((res: any) => { return { id: res.id, name: res.name } })
                .forEach((zone: any) => { this.allZoneDoors[0].zoneDoor.push(zone) });
            res[1].map((res: any) => { return { id: res.id, name: res.name } })
                .forEach((door: any) => { this.allZoneDoors[1].zoneDoor.push(door) });
            this.isLoading = false;
        })
    }

    ngOnInit(): void {
        this.data.zoneData.childZones.forEach((zone: any) => { this.zones.push(zone) });
        this.data.zoneData.doors.forEach((door: any) => { this.zones.push(door) });
        this.zoneForm = this.fb.group({
            name: [this.data.zoneData.name, Validators.required],
            description: [this.data.zoneData.description, Validators.required],
            location: [this.data.zoneData.location.name],
            zoneDoors: [this.zones.map(zone => zone.name), Validators.required]
        })
    }

    get zoneArrayValue() {
        return this.zoneForm.controls['zoneDoors'].value;
    }

    removeChip(zone: any) {
        const newArray = this.zoneArrayValue.filter((item: any) => item !== zone);
        this.zoneForm.controls['zoneDoors'].setValue(newArray);
    }

    delete() {
        this.zoneService.zoneControllerDeleteZone(this.data.zoneData.id).subscribe(res => {
            console.log(res, 'del---');
            this.toastr.success('Zone Removed');
            this.dialogRef.close(true);
        })
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
        const zone: UpdateZoneDto = {
            id: this.data.zoneData.id,
            name: this.zoneForm.controls['name'].value,
            description: this.zoneForm.controls['description'].value,
            zoneIds: zoneIds,
            doorIds: doorIds
        }
        // console.log('hey--------', zone)

        this.zoneService.zoneControllerUpdateZone(zone).subscribe(res => {
            console.log('res===', res);
            this.toastr.success('Zone Updated');
            this.dialogRef.close(true);
        });
    }

}
