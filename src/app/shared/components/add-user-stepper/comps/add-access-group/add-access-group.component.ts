import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-add-access-group',
    templateUrl: './add-access-group.component.html',
    styleUrls: ['./add-access-group.component.scss']
})
export class AddAccessGroupComponent implements OnInit {

    @Output() cancel: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() stepUpdate: EventEmitter<number> = new EventEmitter<number>();
    @Input() fromStep2 = false;

    accessForm: FormGroup = new FormGroup({});
    accessItems: FormArray = new FormArray([]);
    locations: string[] = [
        'location 1',
        'location 2',
        'location 3',
        'location 4',
        'location 5',
        'location 6',
        'location 7',
        'location 8'
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
        private fb: FormBuilder
    ) { }

    ngOnInit(): void {
        this.accessForm = this.fb.group({
            accessItems: this.fb.array([this.createItem()])
        });
    }

    gotoStep(step: number) {
        this.stepUpdate.emit(step);
    }
    close() {
        this.cancel.emit(true);
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
