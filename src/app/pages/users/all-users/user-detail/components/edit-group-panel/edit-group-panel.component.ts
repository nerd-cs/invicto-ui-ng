import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-edit-group-panel',
    templateUrl: './edit-group-panel.component.html',
    styleUrls: ['./edit-group-panel.component.scss']
})
export class EditGroupPanelComponent implements OnInit {
    accessForm: FormGroup = new FormGroup({});
    accessItems: FormArray = new FormArray([]);
    locations: string[] = [
        'location 1',
        'location 2',
        'location 3',
        'location 4',
    ];

    groups: any[] = [
        '24/7 All doors',
        'Lobby',
        'Terrasse',
        'Garage',
        'C Level Offices',
        'Weekend',
        'Shower',
        'Gym'
    ];

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<EditGroupPanelComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
        console.log(this.data.element, 'Data Edit Group');
    }

    ngOnInit(): void {
        this.accessForm = this.fb.group({
            accessItems: this.fb.array([
                this.fb.group({
                    location: ['location 1', Validators.required],
                    group: [['Gym', 'Garage'], Validators.required]
                }),
                this.fb.group({
                    location: ['location 2', Validators.required],
                    group: [['24/7 All doors', 'Gym', 'Shower'], Validators.required]
                })
            ])
        });
    }

    createItem() {
        return this.fb.group({
            location: ['', Validators.required],
            group: [{value: '', disabled: true}, Validators.required]
        });
    }
    addItem() {
        this.accessItems = this.accessForm.get('accessItems') as FormArray;
        this.accessItems.push(this.createItem());
    }
    removeItem(idx: number) {
        this.accessItems = this.accessForm.get('accessItems') as FormArray;
        this.accessItems.removeAt(idx);
    }

    get controlsArray() {
        return (this.accessForm.get('accessItems') as FormArray).controls;
    }

    accessItemsArray(idx: number) {
        return this.controlsArray[idx].value.group;
    }


    removeChip(group: any, idx: number) {
        const formGroup = this.controlsArray[idx] as FormGroup;
        const newGroups = formGroup.value.group.filter((item: any) => item !== group);
        formGroup.controls['group'].setValue(newGroups);
    }

    setLocation(idx: number) {
        const formGroup = this.controlsArray[idx] as FormGroup;
        console.log('TODO:');
        formGroup.controls['group'].enable();
    }
}
