import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MY_FORMATS } from '@app-core/models/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CustomCalendarHeaderComponent } from '../custom-calendar-header/custom-calendar-header.component';

@Component({
    selector: 'app-adding-holiday-tab',
    templateUrl: './adding-holiday-tab.component.html',
    styleUrls: ['./adding-holiday-tab.component.scss'],
    providers: [
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
        },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ]
})

export class AddingHolidayTabComponent implements OnInit, OnDestroy {

    searchKey: any;
    private destroy$ = new Subject();
    customCalendarHeader = CustomCalendarHeaderComponent;

    holidays: any[] = [
        { name: 'Christmas', checked: false },
        { name: 'Easter', checked: false },
        { name: 'National Day', checked: false },
        { name: 'Workers Day', checked: false },
        { name: 'Other Holiday', checked: false },
        { name: 'Other Holiday', checked: false },
        { name: 'Other Holiday', checked: false },
        { name: 'Other Holiday', checked: false },
    ]
    holidayForm!: FormGroup;
    startMinDate = null;
    endMinDate = new Date();

    constructor(
        private dialogRef: MatDialogRef<AddingHolidayTabComponent>,
        private fb: FormBuilder
    ) { }

    ngOnInit(): void {
        this.holidayForm = this.fb.group({
            name: ['Christmas', Validators.required],
            recurrence: ['Every year', Validators.required],
            startDate: [new Date()],
            endDate: [new Date()],
        });
        this.holidayForm.controls['startDate'].valueChanges.pipe(takeUntil(this.destroy$)).subscribe(res => {
            if (res) {
                this.endMinDate = res;
                this.holidayForm.patchValue({endDate: res});
            }
        });
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    add() {
        this.dialogRef.close(true);
    }
}
