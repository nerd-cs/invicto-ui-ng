import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-zone-panel',
    templateUrl: './zone-panel.component.html',
    styleUrls: ['./zone-panel.component.scss']
})
export class ZonePanelComponent implements OnInit {

    zoneForm: FormGroup = new FormGroup({});

    zones: any[] = ['Door 12', 'Door 25', 'MainEntrance'];

    constructor(
        private dialogRef: MatDialogRef<ZonePanelComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder
    ) { }

    ngOnInit(): void {
        this.zoneForm = this.fb.group({
            name: ['Lobby', Validators.required],
            location: ['Quebec Office', Validators.required],
            zoneDoors: [['Door 12', 'Door 25'], Validators.required]
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

    }

}
