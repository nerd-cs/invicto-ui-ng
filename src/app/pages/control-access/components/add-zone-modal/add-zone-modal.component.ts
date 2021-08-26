import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-add-zone-modal',
    templateUrl: './add-zone-modal.component.html',
    styleUrls: ['./add-zone-modal.component.scss']
})
export class AddZoneModalComponent implements OnInit {

    zoneFormGroup: FormGroup = new FormGroup({});

    zones: any[] = ['Door 12', 'Door 25', 'MainEntrance'];

    constructor(
        private dialogRef: MatDialogRef<AddZoneModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder
    ) { }

    ngOnInit(): void {
        this.zoneFormGroup = this.fb.group({
            name: ['Lobby', Validators.required],
            location: ['Quebec Office', Validators.required],
            zoneDoors: [['Door 12', 'Door 25'], Validators.required]
        })
    }

    get zoneArrayValue() {
        return this.zoneFormGroup.controls['zoneDoors'].value;
    }

    removeChip(zone: any) {
        const newArray = this.zoneArrayValue.filter((item: any) => item !== zone);
        this.zoneFormGroup.controls['zoneDoors'].setValue(newArray);
    }

    save() {
        this.dialogRef.close(true);
    }

    cancel() {
        this.dialogRef.close();
    }
}
