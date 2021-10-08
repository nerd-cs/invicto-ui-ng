import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ConfirmService } from '@app-core/services/confirm.service';
import { AddingHolidayTabComponent } from '@app-shared/components/adding-holiday-tab/adding-holiday-tab.component';
import { TimeSlotComponent } from '@app-shared/components/time-slot/time-slot.component';
import { ToastrService } from 'ngx-toastr';
import { DoorService, UpdateDoorDto } from 'src/app/api_codegen';


@Component({
  selector: 'app-conf-door-edit',
  templateUrl: './conf-door-edit.component.html',
  styleUrls: ['./conf-door-edit.component.scss']
})
export class ConfDoorEditComponent implements OnInit {

    doorForm!: FormGroup;
    weekdays: any = [
        {
            day: 'Monday', status: false, schedules: []
        },
        {
            day: 'Tuesday', status: false, schedules: []
        },
        {
            day: 'Wednesday', status: false, schedules: []
        },
        {
            day: 'Thursday', status: false, schedules: []
        },
        {
            day: 'Friday', status: false, schedules: []
        },
        {
            day: 'Saturday', status: false, schedules: []
        },
        {
            day: 'Sunday', status: false, schedules: []
        }
    ]

    holidays: any[] = [];
    initSchedule: any;

    constructor(
        private dialogRef: MatDialogRef<ConfDoorEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder,
        private dialog: MatDialog,
        private confirmService: ConfirmService,
        private doorService: DoorService,
        private toastr: ToastrService
    ) {
        console.log('hey - door data --- ', this.data)
        this.data.door.timetables.forEach((element: any) => {
            switch (element.day) {
                case 'MONDAY':
                    this.weekdays[0].status = element.isActive
                    this.weekdays[0].schedules = [...element.timeslots]
                    break;
                case 'TUESDAY':
                    this.weekdays[1].status = element.isActive
                    this.weekdays[1].schedules = [...element.timeslots]
                    break;
                case 'WEDNESDAY':
                    this.weekdays[2].status = element.isActive
                    this.weekdays[2].schedules = [...element.timeslots]
                    break;
                case 'THURSDAY':
                    this.weekdays[3].status = element.isActive
                    this.weekdays[3].schedules = [...element.timeslots]
                    break;
                case 'FRIDAY':
                    this.weekdays[4].status = element.isActive
                    this.weekdays[4].schedules = [...element.timeslots]
                    break;
                case 'SATURDAY':
                    this.weekdays[5].status = element.isActive
                    this.weekdays[5].schedules = [...element.timeslots]
                    break;
                case 'SUNDAY':
                    this.weekdays[6].status = element.isActive
                    this.weekdays[6].schedules = [...element.timeslots]
                    break;

                default:
                    break;
            }
        });
        this.data.door.holidays.forEach((element: any) => {
            const item = {
                id: element.id,
                holiday: element.name,
                status: element.isActive,
                schedules: element.timetables
            }
            this.holidays.push(item);
        });
    }

    ngOnInit(): void {
        this.doorForm = this.fb.group({
            name: [this.data.door.name, Validators.required],
        });
    }

    testDoor() {
        this.doorService.doorControllerTestDoor(this.data.door.id).subscribe(res => {
            this.toastr.success('Door Testing !');
        })
    }

    toogleChange(evt: any, day: any, idx: number, type: string) {
        if (evt.checked && day.schedules.length === 0 && type === 'weekday') {
            this.weekdays[idx].schedules = [{ startTime: '12:00 AM', endTime: '12:00 AM' }]
        } else if (evt.checked && day.schedules.length === 0 && type === 'holiday') {
            this.holidays[idx].schedules = [{ startTime: '12:00 AM', endTime: '12:00 AM' }]
        }
    }

    addHoliday() {
        console.log('hey - ADD HOLIDAY MODAL')
        this.dialog.open(AddingHolidayTabComponent, {
            disableClose: false,
            panelClass: 'adding-holiday-tab',
            data: {
                selectedHoliday: this.holidays
            }
        }).afterClosed().subscribe(res => {
            if (res) {
                this.holidays = [];
                res.forEach((element: any) => {
                    const item = {
                        id: element.id,
                        holiday: element.name,
                        status: element.checked,
                        schedules: [{ startTime: '12:00 AM', endTime: '12:00 AM' }]
                    }
                    this.holidays.push(item);
                });
                this.confirmService.openSnackBar('New holiday added ! 🎉🎉🎉');
            }
        })
    }

    deleteHoliday(idx: number) {
        this.holidays.splice(idx, 1);
    }

    addTimeSlot(idx: number, type: string) {

        this.dialog.open(TimeSlotComponent, {
            disableClose: true,
            panelClass: 'time-slot-modal',
            data: {
                mode: 'add',
                type: type
            }
        }).afterClosed().subscribe(res => {
            console.log('add time slot', res);
            if (res.mode === 'add' && type === 'weekday') {
                this.weekdays[idx].schedules.push(res.timeSlot);
            }
            if (res.mode === 'add' && type === 'holiday') {
                this.holidays[idx].schedules.push(res.timeSlot);
            }
        });
    }

    editTimeSlot(dayIdx: number, slotIdx: number, schedule: any, type: string) {
        console.log(type, schedule, 'edit---')
        this.dialog.open(TimeSlotComponent, {
            disableClose: true,
            panelClass: 'time-slot-modal',
            data: {
                mode: 'edit',
                type: type,
                schedule: schedule
            }
        }).afterClosed().subscribe(res => {
            console.log('edit time slot', res);
            if (res === 'delete' && type === 'weekday') {
                this.weekdays[dayIdx].schedules.splice(slotIdx, 1)
            } else if (res === 'delete' && type === 'holiday') {
                this.holidays[dayIdx].schedules.splice(slotIdx, 1)
            } else if (res.mode === 'edit' && type === 'weekday') {
                this.weekdays[dayIdx].schedules.splice(slotIdx, 1, res.timeSlot)
            } else if (res.mode === 'edit' && type === 'holiday') {
                this.holidays[dayIdx].schedules.splice(slotIdx, 1, res.timeSlot)
            }
        });
    }

    updateDoor() {
        let timeTables: any[] = [];
        this.weekdays.forEach((element: any) => {
            let timeSlots: any[] = [];
            element.schedules.map((item: any) => {
                timeSlots.push({ startTime: item.startTime, endTime: item.endTime })
            })
            timeTables.push({
                day: element.day.toUpperCase(),
                isActive: element.status,
                timeslots: timeSlots
            })
        });
        let holidays: any[] = [];
        this.holidays.forEach((element: any) => {
            let timeSlots: any[] = [];
            element.schedules.map((item: any) => {
                timeSlots.push({ startTime: item.startTime, endTime: item.endTime })
            })
            holidays.push({
                holidayId: element.id,
                isActive: element.status,
                timetables: timeSlots
            })
        });
        console.log(timeTables, holidays);

        const updateDoor: UpdateDoorDto = {
            id: this.data.door.id,
            name: this.doorForm.controls['name'].value,
            timetables: timeTables,
            holidays: holidays
        }
        this.doorService.doorControllerUpdateDoor(updateDoor).subscribe(res => {
            this.toastr.success('Door Updated');
            this.dialogRef.close(true);
        })
    }
}
