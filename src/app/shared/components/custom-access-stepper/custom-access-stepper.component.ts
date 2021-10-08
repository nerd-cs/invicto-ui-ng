import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddUserStepperComponent } from '../add-user-stepper/add-user-stepper.component';

@Component({
    selector: 'app-custom-access-stepper',
    templateUrl: './custom-access-stepper.component.html',
    styleUrls: ['./custom-access-stepper.component.scss']
})
export class CustomAccessStepperComponent implements OnInit {

    step = 1;
    fromStep3 = false;
    locations: any[] = [];
    schedules: any[] = [];

    locationZoneDoors: any;
    customZoneData: any;

    constructor(
        private dialogRef: MatDialogRef<CustomAccessStepperComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder
    ) {
        if (this.data.locations) { this.locations = this.data.locations }
        if (this.data.schedules) { this.schedules = this.data.schedules }
        if (this.data && this.data.step) {
            this.step = this.data.step;
            if (this.step === 3) {
                this.fromStep3 = true;
                this.step = 3;
            }
        }
     }

    ngOnInit(): void {
    }

    stepUpdate(evt: number) {
        this.step = evt;
    }

    cancel(evt?: boolean) {
        this.dialogRef.close(false);
    }

    save(evt: boolean) {
        const data = {
            save: evt
        }
        this.dialogRef.close(data);
    }

    addZoneDoorInitData(evt: any) {
        this.locationZoneDoors = evt;
    }

    customZone(evt: any) {
        this.customZoneData = evt;
    }
    customZoneSchedule(evt: any) {
        console.log(evt, 'HUH----------', this.locationZoneDoors.tempZones);
        const item = {
            zoneDoor: evt.zone,
            schedule: evt.schedule
        }
        this.locationZoneDoors.tempZones.push(item);
        this.locationZoneDoors.zones.push(evt.zone);
        this.schedules.push(evt.schedule)
    }
}
