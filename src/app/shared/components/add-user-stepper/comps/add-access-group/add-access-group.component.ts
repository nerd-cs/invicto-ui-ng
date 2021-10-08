import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccessGroupService, LocationResponse } from 'src/app/api_codegen';
import { LocationService } from 'src/app/api_codegen/api/location.service';

@Component({
    selector: 'app-add-access-group',
    templateUrl: './add-access-group.component.html',
    styleUrls: ['./add-access-group.component.scss']
})
export class AddAccessGroupComponent implements OnInit {

    @Output() cancel: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() stepUpdate: EventEmitter<number> = new EventEmitter<number>();
    @Output() locationGroup: EventEmitter<any> = new EventEmitter<any>();
    @Input() fromStep2 = false;

    accessForm: FormGroup = new FormGroup({});
    accessItems: FormArray = new FormArray([]);
    locations: LocationResponse[] = [];
    groups: any[] = [];

    constructor(
        private fb: FormBuilder,
        private locationService: LocationService,
        private accessGroupService: AccessGroupService,
    ) {
        this.locationService.locationControllerGetAllForCompany().subscribe(res => {
            this.locations = res;
            console.log('locations-------', res);
        })
    }

    ngOnInit(): void {
        this.accessForm = this.fb.group({
            accessItems: this.fb.array([this.createItem()])
        });
    }

    saveAccessGroup() {
        this.locationGroup.emit(this.accessForm.value);
    }

    gotoStep(step: number) {
        this.locationGroup.emit(this.accessForm.value);
        this.stepUpdate.emit(step);
    }

    close() {
        this.cancel.emit(true);
    }

    createItem() {
        return this.fb.group({
            location: [null, Validators.required],
            group: [{value: '', disabled: true}, Validators.required],
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

    async setLocation(idx: number) {
        const formGroup = this.controlsArray[idx] as FormGroup;
        const locationId = formGroup.value.location.id
        const groups = await this.accessGroupService.accessGroupControllerGetAllForLocation(locationId).toPromise();
        console.log('TODO:', locationId, groups);

        if (!this.groups.some((element) => (element.locationId === locationId))) {
            const item = {locationId: locationId, groups: groups}
            this.groups.push(item);
        }
        console.log(this.groups, '====================')
        formGroup.controls['group'].enable();
    }

    getGroupList(idx: number) {
        let index;
        const formGroup = this.controlsArray[idx] as FormGroup;
        const locationId = formGroup.value?.location?.id;
        index = this.groups.map(g => g.locationId).indexOf(locationId);
        if (index !== -1) {
            return this.groups[index].groups;
        } else {
            return null
        }
    }
}
