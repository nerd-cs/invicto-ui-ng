import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmService } from '@app-core/services/confirm.service';
import { AddingHolidayTabComponent } from '@app-shared/components/adding-holiday-tab/adding-holiday-tab.component';
import { TimeSlotComponent } from '@app-shared/components/time-slot/time-slot.component';
import { HolidayService, ScheduleService } from 'src/app/api_codegen';

@Component({
    selector: 'app-add-schedule-modal',
    templateUrl: './add-schedule-modal.component.html',
    styleUrls: ['./add-schedule-modal.component.scss']
})
export class AddScheduleModalComponent implements OnInit {

    weekdays: any = [
        {
            day: 'Monday', status: true, schedules: [
                { from: '5.00 am', to: '6.00 am' },
                { from: '5.00 pm', to: '6.00 pm' },
                { from: '5.00 pm', to: '6.00 pm' },
                { from: '5.00 pm', to: '6.00 pm' },
                { from: '5.00 pm', to: '6.00 pm' },
                { from: '5.00 pm', to: '6.00 pm' },
            ]
        },
        {
            day: 'Tuesday', status: true, schedules: [
                { from: '5.00 am', to: '6.00 am' },
                { from: '5.00 pm', to: '6.00 pm' }
            ]
        },
        {
            day: 'Wednesday', status: false, schedules: [
                { from: '5.00 am', to: '6.00 am' },
                { from: '5.00 am', to: '6.00 am' },
                { from: '5.00 am', to: '6.00 am' },
                { from: '5.00 pm', to: '6.00 pm' }
            ]
        },
        {
            day: 'Thursday', status: true, schedules: [
                { from: '5.00 pm', to: '6.00 pm' }
            ]
        },
        {
            day: 'Friday', status: false, schedules: [
                { from: '5.00 am', to: '6.00 am' },
                { from: '5.00 pm', to: '6.00 pm' }
            ]
        },
        {
            day: 'Saturday', status: true, schedules: [
                { from: '5.00 am', to: '6.00 am' },
                { from: '5.00 am', to: '6.00 am' },
                { from: '5.00 pm', to: '6.00 pm' }
            ]
        },
        {
            day: 'Sunday', status: true, schedules: [
                { from: '5.00 am', to: '6.00 am' },
                { from: '5.00 pm', to: '6.00 pm' }
            ]
        }
    ]

    holidays: any = [
        // {
        //     holiday: 'Christmas', status: true, schedules: [
        //         { from: '12.00 am', to: '12.00 pm' },
        //         { from: '12.00 am', to: '12.00 pm' },
        //         { from: '12.00 am', to: '12.00 pm' },
        //     ]
        // },
        // {
        //     holiday: `New Year's Day`, status: true, schedules: [
        //         { from: '12.00 am', to: '12.00 pm' },
        //     ]
        // },
    ]

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
        this.scheduleForm = this.fb.group({
            name: ['', Validators.required],
            description: [''],
        })
        this.holidayService.holidayControllerGetAllHolidays().subscribe(res => {
            this.holidayList = res;
            this.holidayList.forEach(holiday => {
                const holidayItem = {
                    holiday: holiday.name,
                    status: false,
                    schedules: [],
                    id: holiday.id
                }
                this.holidays.push(holidayItem);
            });
            console.log(this.holidayList, 'holidays---');
        })
    }

    cancel() { }
    save() { }

    addHoliday() {
        this.dialog.open(AddingHolidayTabComponent, {
            disableClose: false,
            panelClass: 'adding-holiday-tab',
        }).afterClosed().subscribe(res => {
            if (res) {
                this.confirmService.openSnackBar('New holiday added ! 🎉🎉🎉');
            }
        })
    }

    deleteHoliday(idx: number) {
        this.holidays.splice(idx, 1);
    }

    addTimeSlot(idx: number, type: string) {
        console.log(type, 'add---')

        this.dialog.open(TimeSlotComponent, {
            disableClose: true,
            panelClass: 'time-slot-modal',
            data: {
                mode: 'add',
                type: type
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
        });
    }
}
