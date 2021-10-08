import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmService } from '@app-core/services/confirm.service';
import { ToastrService } from 'ngx-toastr';
import { AccessGroupService, UpdateAccessGroupDto } from 'src/app/api_codegen';

@Component({
    selector: 'app-access-group-panel',
    templateUrl: './access-group-panel.component.html',
    styleUrls: ['./access-group-panel.component.scss']
})
export class AccessGroupPanelComponent implements OnInit {

    accessGroupForm: FormGroup = new FormGroup({});
    zoneDoorItems: FormArray = new FormArray([]);
    accessGroupData: any;
    schedules: any;
    zones: any;

    constructor(
        private fb: FormBuilder,
        private confirmService: ConfirmService,
        private dialogRef: MatDialogRef<AccessGroupPanelComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private accessGroupService: AccessGroupService,
        private toastr: ToastrService
    ) {
        this.accessGroupData = this.data.accessGroup;
        this.schedules = this.data.schedules;
        this.zones = this.data.zones;
        console.log('this.accessData ?????', this.accessGroupData, this.schedules, this.zones);
    }

    ngOnInit(): void {
        let zoneDoorItems: any[] = [];
        this.accessGroupData.zoneSchedules.forEach((element: any) => {
            zoneDoorItems.push(this.fb.group({
                zoneDoor: [element.zone, Validators.required],
                schedule: [element.schedule, Validators.required]
            }));
        })

        this.accessGroupForm = this.fb.group({
            name: [this.accessGroupData.name, Validators.required],
            location: [this.accessGroupData.location.name, Validators.required],
            zoneDoorItems: this.fb.array(zoneDoorItems)
        });
    }

    objectCompareWith(o1: any, o2: any) { return o1.name === o2.name && o1.id === o2.id };

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
                this.accessGroupService.accessGroupControllerDeleteAccessGroup(this.accessGroupData.id).subscribe(res => {
                    this.dialogRef.close(true);
                })
            }
        })
    }

    update() {
        let zoneSchedules: any[] = [];
        this.accessGroupForm.controls['zoneDoorItems'].value.forEach((element: any) => {
            const item = { zoneId: element.zoneDoor.id, scheduleId: element.schedule.id };
            zoneSchedules.push(item);
        });
        const updateBody: UpdateAccessGroupDto = {
            id: this.accessGroupData.id,
            name: this.accessGroupForm.controls['name'].value,
            zoneSchedules: zoneSchedules
        }
        this.accessGroupService.accessGroupControllerUpdateAccessGroup(updateBody).subscribe(res => {
            this.toastr.success('Access Group Updated');
            this.dialogRef.close(true);
        })
    }
}
