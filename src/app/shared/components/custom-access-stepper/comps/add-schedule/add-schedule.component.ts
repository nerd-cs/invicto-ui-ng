import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmService } from '@app-core/services/confirm.service';
import { AddingHolidayTabComponent } from '@app-shared/components/adding-holiday-tab/adding-holiday-tab.component';
import { TimeSlotComponent } from '@app-shared/components/time-slot/time-slot.component';
import * as moment from 'moment';
@Component({
    selector: 'app-add-schedule',
    templateUrl: './add-schedule.component.html',
    styleUrls: ['./add-schedule.component.scss']
})
export class AddScheduleComponent implements OnInit {

    @Output() cancel: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() stepUpdate: EventEmitter<number> = new EventEmitter<number>();

    weekdays: any = [
        {
            day: 'Monday', status: true, schedules: [
                { from: '5.00 am', to: '6.00 am' },
                { from: '5.00 pm', to: '6.00 pm' }
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
        {
            holiday: 'Christmas', status: true, schedules: [
                { from: '12.00 am', to: '12.00 pm' },
                { from: '12.00 am', to: '12.00 pm' },
                { from: '12.00 am', to: '12.00 pm' },
            ]
        },
        {
            holiday: `New Year's Day`, status: true, schedules: [
                { from: '12.00 am', to: '12.00 pm' },
            ]
        },
    ]

    constructor(
        private fb: FormBuilder,
        private dialog: MatDialog,
        private confirmService: ConfirmService
    ) { }

    ngOnInit(): void {

    }

    gotoStep(step: number) {
        this.stepUpdate.emit(step);
    }
    close() {
        this.cancel.emit(true);
    }

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
