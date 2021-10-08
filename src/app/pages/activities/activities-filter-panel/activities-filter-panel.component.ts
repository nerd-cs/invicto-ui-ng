import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MY_FORMATS } from '@app-core/models/common';
import { CustomCalendarHeaderComponent } from '@app-shared/components/custom-calendar-header/custom-calendar-header.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-activities-filter-panel',
    templateUrl: './activities-filter-panel.component.html',
    styleUrls: ['./activities-filter-panel.component.scss'],
    providers: [
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
        },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ]
})
export class ActivitiesFilterPanelComponent implements OnInit {
    private destroy$ = new Subject();
    customCalendarHeader = CustomCalendarHeaderComponent;

    filterForm!: FormGroup;
    startMinDate = null;
    endMinDate = new Date();

    constructor(
        private dialogRef: MatDialogRef<ActivitiesFilterPanelComponent>,
        private fb: FormBuilder
    ) { }

    ngOnInit(): void {
        this.filterForm = this.fb.group({
            status: ['Check-in', Validators.required],
            location: ['Quebec', Validators.required],
            door: ['All doors', Validators.required],
            zone: ['All zones', Validators.required],
            accessGroup: ['24/7 All day', Validators.required],
            startDate: [new Date()],
            endDate: [new Date()],
        });
        this.filterForm.controls['startDate'].valueChanges.pipe(takeUntil(this.destroy$)).subscribe(res => {
            if (res) {
                this.endMinDate = res;
                this.filterForm.patchValue({endDate: res});
            }
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

}
