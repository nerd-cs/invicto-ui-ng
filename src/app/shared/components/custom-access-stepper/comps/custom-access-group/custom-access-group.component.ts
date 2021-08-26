import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
    selector: 'app-custom-access-group',
    templateUrl: './custom-access-group.component.html',
    styleUrls: ['./custom-access-group.component.scss']
})
export class CustomAccessGroupComponent implements OnInit {

    @Output() cancel: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() save: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() stepUpdate: EventEmitter<number> = new EventEmitter<number>();

    accessGroupForm!: FormGroup;
    lines: FormArray = new FormArray([]);
    constructor(
        private fb: FormBuilder
    ) { }

    ngOnInit(): void {
        this.accessGroupForm = this.fb.group({
            name: ['Cleaning Team', Validators.required],
            description: ['Optional'],
            lines: this.fb.array([
                this.fb.group({
                    zonedoor: ['Office 1', Validators.required],
                    schedule: ['9am-11am', Validators.required]
                }),
                this.fb.group({
                    zonedoor: ['Office 3', Validators.required],
                    schedule: ['All day', Validators.required]
                })
            ])
        })
    }

    close() {
        this.cancel.emit(true);
    }
    gotoStep(step: number) {
        this.stepUpdate.emit(step);
    }

    saveGroup() {
        this.save.emit(true);
    }

    createLine() {
        return this.fb.group({
            zonedoor: ['', Validators.required],
            schedule: ['', Validators.required]
        })
    }

    addLine() {
        this.lines = this.accessGroupForm.get('lines') as FormArray;
        this.lines.push(this.createLine());
    }
    removeLine(idx: number) {
        this.lines = this.accessGroupForm.get('lines') as FormArray;
        this.lines.removeAt(idx);
    }

    get controlsArray() {
        return (this.accessGroupForm.get('lines') as FormArray).controls;
    }
}


