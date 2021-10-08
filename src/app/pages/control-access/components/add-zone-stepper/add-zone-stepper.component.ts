import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CreateZoneDto, LocationService, ZoneService } from 'src/app/api_codegen';

@Component({
    selector: 'app-add-zone-stepper',
    templateUrl: './add-zone-stepper.component.html',
    styleUrls: ['./add-zone-stepper.component.scss']
})
export class AddZoneStepperComponent implements OnInit {

    step = 1;
    locations: any;

    location: number = 0;
    description: string = '';
    name: string = '';

    stepThreeData: any;

    constructor(
        private dialogRef: MatDialogRef<AddZoneStepperComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private locationService: LocationService,
        private zoneService: ZoneService,
        private toastr: ToastrService
    ) {
        this.locations = data.locations;
    }

    ngOnInit(): void {

    }

    cancel(event: any) {
        this.dialogRef.close(false);
    }

    stepUpdate(evt: any) {
        this.name = evt.data.name;
        this.description = evt.data.description;
        this.location = evt.data.location.id;
        this.stepThreeData = {
            name: this.name,
            description: this.description,
            location: evt.data.location
        }
        this.step = evt.step;
    }

    save(evt: any) {
        console.log('---------', evt);
        const createZone: CreateZoneDto = {
            name: this.name,
            description: this.description,
            locationId: this.location,
            doorIds: evt.doorIds,
            zoneIds: evt.zoneIds
        }
        this.zoneService.zoneControllerCreateZone(createZone).subscribe(res => {
            console.log('res - crete zone', res);
            this.toastr.success('Zone Created');
            this.dialogRef.close(true);
        })
    }

}
