import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmService } from '@app-core/services/confirm.service';
import { AddingHolidayTabComponent } from '@app-shared/components/adding-holiday-tab/adding-holiday-tab.component';
import { TimeSlotComponent } from '@app-shared/components/time-slot/time-slot.component';
import { timingSafeEqual } from 'crypto';
import { ToastrService } from 'ngx-toastr';
import { ScheduleService, UpdateScheduleDto } from 'src/app/api_codegen';

@Component({
    selector: 'app-schedule-panel',
    templateUrl: './schedule-panel.component.html',
    styleUrls: ['./schedule-panel.component.scss']
})
export class SchedulePanelComponent implements OnInit {

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

    scheduleForm!: FormGroup;
    initSchedule: any;

    constructor(
        private dialogRef: MatDialogRef<SchedulePanelComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder,
        private dialog: MatDialog,
        private confirmService: ConfirmService,
        private scheduleService: ScheduleService,
        private toastr: ToastrService
    ) {
        this.initSchedule = this.data.schedule;
        console.log(this.data, 'hey schedule data to modal')
        this.initSchedule.timetables.forEach((element: any) => {
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
        this.initSchedule.holidays.forEach((element: any) => {
            const item = {
                id: element.id,
                holiday: element.name,
                status: element.isActive,
                schedules: element.timetables
            }
            this.holidays.push(item);
        });
        console.log(this.holidays, 'hey - holidays init data')
    }

    ngOnInit(): void {
        this.scheduleForm = this.fb.group({
            name: [this.initSchedule.name, Validators.required],
            description: [this.initSchedule.description],
        })
    }

    toogleChange(evt: any, day: any, idx: number, type: string) {
        if (evt.checked && day.schedules.length === 0 && type === 'weekday') {
            this.weekdays[idx].schedules = [{ startTime: '12:00 AM', endTime: '12:00 AM' }]
        } else if (evt.checked && day.schedules.length === 0 && type === 'holiday') {
            this.holidays[idx].schedules = [{ startTime: '12:00 AM', endTime: '12:00 AM' }]
        }
    }

    updateSchedule() {
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

        const updateSchedule: UpdateScheduleDto = {
            id: this.initSchedule.id,
            name: this.scheduleForm.controls['name'].value,
            description: this.scheduleForm.controls['description'].value,
            timetables: timeTables,
            holidays: holidays
        }
        this.scheduleService.scheduleControllerUpdateSchedule(updateSchedule).subscribe(res => {
            this.toastr.success('Schedule Updated')
            this.dialogRef.close(true);
        })
    }

    delete() {
        this.scheduleService.scheduleControllerDeleteSchedule(this.initSchedule.id).subscribe(res => {
            this.toastr.success('Schedule Deleted')
            this.dialogRef.close(true);
        })
    }

    addHoliday() {
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

}
