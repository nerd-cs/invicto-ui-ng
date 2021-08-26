import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MY_FORMATS } from '@app-core/models/common';
import { CustomCalendarHeaderComponent } from '@app-shared/components/custom-calendar-header/custom-calendar-header.component';

@Component({
    selector: 'app-filters-panel',
    templateUrl: './filters-panel.component.html',
    styleUrls: ['./filters-panel.component.scss'],
    providers: [
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
        },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ]
})
export class FiltersPanelComponent implements OnInit {
    private destroy$ = new Subject();
    customCalendarHeader = CustomCalendarHeaderComponent;

    filterForm!: FormGroup;
    startMinDate = null;
    endMinDate = new Date();

    constructor(
        private dialogRef: MatDialogRef<FiltersPanelComponent>,
        private fb: FormBuilder
    ) { }

    ngOnInit(): void {
        this.filterForm = this.fb.group({
            status: ['Active', Validators.required],
            department: ['All department', Validators.required],
            locations: ['Quebec', Validators.required],
            accessGroup: ['24/7 All day', Validators.required],
            costCenter: ['Quebec Office', Validators.required],
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
