import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmService } from '@app-core/services/confirm.service';

@Component({
    selector: 'app-access-group-panel',
    templateUrl: './access-group-panel.component.html',
    styleUrls: ['./access-group-panel.component.scss']
})
export class AccessGroupPanelComponent implements OnInit {

    accessGroupForm: FormGroup = new FormGroup({});
    zoneDoorItems: FormArray = new FormArray([]);
    constructor(
        private fb: FormBuilder,
        private confirmService: ConfirmService
    ) { }

    ngOnInit(): void {
        this.accessGroupForm = this.fb.group({
            name: ['Cleaning Team', Validators.required],
            description: ['Maria Crew', Validators.required],
            zoneDoorItems: this.fb.array([
                this.fb.group({
                    zoneDoor: ['Office 1', Validators.required],
                    schedule: ['9am-11am', Validators.required]
                }),
                this.fb.group({
                    zoneDoor: ['Office 2', Validators.required],
                    schedule: ['9am-11am', Validators.required]
                })
            ])
        });
    }

    createItem() {
        return this.fb.group({
            zoneDoor: ['', Validators.required],
            schedule: ['', Validators.required]
        })
    }
    addItem() {
        this.zoneDoorItems = this.accessGroupForm.get('zoneDoorItems') as FormArray;
        this.zoneDoorItems.push(this.createItem());
    }
    removeItem(idx: number) {
        this.zoneDoorItems = this.accessGroupForm.get('zoneDoorItems') as FormArray;
        this.zoneDoorItems.removeAt(idx);
    }

    get zoneDoorArray() {
        return (this.accessGroupForm.get('zoneDoorItems') as FormArray).controls;
    }


    delete() {
        this.confirmService.confirm('Delete Access Group?', 'DELETE').afterClosed().subscribe(res => {
            if (res) {
                // TODO: api
            }
        })
    }
}
