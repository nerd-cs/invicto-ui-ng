import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
const moment = _rollupMoment || _moment;
import { MY_FORMATS } from '@app-core/models/common';
import { CustomCalendarHeaderComponent } from '../custom-calendar-header/custom-calendar-header.component';

@Component({
    selector: 'app-time-slot',
    templateUrl: './time-slot.component.html',
    styleUrls: ['./time-slot.component.scss'],
    providers: [
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
        },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ]
})
export class TimeSlotComponent implements OnInit, OnDestroy {

    options: string[] = [];

    private destroy$ = new Subject();
    customCalendarHeader = CustomCalendarHeaderComponent;

    timeSlotForm!: FormGroup;
    type = 'weekday' || 'holiday';
    mode = 'edit' || 'add';
    starting: Date | string = new Date() || '';
    sPeriod = 'AM' || 'PM';
    ending: Date | string = new Date() || '';
    ePeriod = 'AM' || 'PM';

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<TimeSlotComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
        for (let hour = 0; hour < 12; hour++) {
            this.options.push(_moment({ hour }).format('hh:mm'));
            this.options.push(_moment({ hour, minute: 15 }).format('hh:mm'));
            this.options.push(_moment({ hour, minute: 30 }).format('hh:mm'));
            this.options.push(_moment({ hour, minute: 45 }).format('hh:mm'));
        }
        // console.log(this.options);
        console.log(this.data, 'data---time slot')
        this.type = data.type;
        this.mode = data.mode;
        if (this.mode === 'edit') {
            const startTime = data.schedule.startTime;
            const endTime = data.schedule.endTime;
            this.starting = startTime.split(' ')[0];
            this.ending = endTime.split(' ')[0];
            this.sPeriod = startTime.slice(-2)
            this.ePeriod = endTime.slice(-2)
        } else {
            this.starting = "12:00"
            this.ending = "11:45"
            this.sPeriod = 'AM'
            this.ePeriod = 'PM'
        }
    }

    ngOnInit(): void {
        this.timeSlotForm = this.fb.group({
            starting: [this.starting, Validators.required],
            sPeriod: [this.sPeriod, Validators.required],
            ending: [this.ending, Validators.required],
            ePeriod: [this.ePeriod, Validators.required]
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    save() {
        const timeSlot = {
            startTime: this.timeSlotForm.controls['starting'].value + ' ' + this.timeSlotForm.controls['sPeriod'].value,
            endTime: this.timeSlotForm.controls['ending'].value + ' ' + this.timeSlotForm.controls['ePeriod'].value,
        }
        this.dialogRef.close({ timeSlot: timeSlot, mode: this.mode });
    }
    cancel() {
        this.dialogRef.close(false);
    }
    delete() {
        this.dialogRef.close('delete');
    }
}
