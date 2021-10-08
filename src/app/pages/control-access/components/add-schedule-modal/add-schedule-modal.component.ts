import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmService } from '@app-core/services/confirm.service';
import { AddingHolidayTabComponent } from '@app-shared/components/adding-holiday-tab/adding-holiday-tab.component';
import { TimeSlotComponent } from '@app-shared/components/time-slot/time-slot.component';
import { CreateScheduleDto, HolidayService, ScheduleService } from 'src/app/api_codegen';

@Component({
    selector: 'app-add-schedule-modal',
    templateUrl: './add-schedule-modal.component.html',
    styleUrls: ['./add-schedule-modal.component.scss']
})
export class AddScheduleModalComponent implements OnInit {

    isLoading = false;
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

    holidayList: any[] = [];
    scheduleForm!: FormGroup;

    constructor(
        private dialogRef: MatDialogRef<AddScheduleModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder,
        private dialog: MatDialog,
        private confirmService: ConfirmService,
        private scheduleService: ScheduleService,
        private holidayService: HolidayService
    ) { }

    ngOnInit(): void {
        // this.isLoading = true;
        this.scheduleForm = this.fb.group({
            name: ['', Validators.required],
            description: [''],
        })
    }

    toogleChange(evt: any, day: any, idx: number, type: string) {
        if (evt.checked && day.schedules.length === 0 && type === 'weekday') {
            this.weekdays[idx].schedules = [{ startTime: '12:00 AM', endTime: '12:00 AM' }]
        } else if (evt.checked && day.schedules.length === 0 && type === 'holiday') {
            this.holidays[idx].schedules = [{ startTime: '12:00 AM', endTime: '12:00 AM' }]
        }
    }

    cancel() {
        this.dialogRef.close(false);
    }
    save() {
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
        const newSchedule: CreateScheduleDto = {
            name: this.scheduleForm.controls['name'].value,
            description: this.scheduleForm.controls['description'].value,
            timetables: timeTables,
            holidays: holidays
        }
        this.scheduleService.scheduleControllerCreateSchedule(newSchedule).subscribe(res => {
            console.log('new Schedule ', res);
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
