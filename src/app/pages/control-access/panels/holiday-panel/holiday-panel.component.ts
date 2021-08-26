import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MY_FORMATS } from '@app-core/models/common';
import { CustomCalendarHeaderComponent } from '@app-shared/components/custom-calendar-header/custom-calendar-header.component';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HolidayService, UpdateHolidayDto } from 'src/app/api_codegen';

@Component({
    selector: 'app-holiday-panel',
    templateUrl: './holiday-panel.component.html',
    styleUrls: ['./holiday-panel.component.scss'],
    providers: [
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
        },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ]
})
export class HolidayPanelComponent implements OnInit {

    private destroy$ = new Subject();
    customCalendarHeader = CustomCalendarHeaderComponent;

    holidayForm!: FormGroup;
    startMinDate: any = null;
    endMinDate: any = null;

    constructor(
        private dialogRef: MatDialogRef<HolidayPanelComponent>,
        private fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private holidayService: HolidayService,
        private toastr: ToastrService
    ) {
        this.endMinDate = new Date(this.data.holiday.endDate);
    }

    ngOnInit(): void {
        this.holidayForm = this.fb.group({
            name: [this.data.holiday.name, Validators.required],
            recurrence: [this.data.holiday.recurrence, Validators.required],
            startDate: [new Date(this.data.holiday.startDate)],
            endDate: [new Date(this.data.holiday.endDate)],
        });
        this.holidayForm.controls['startDate'].valueChanges.pipe(takeUntil(this.destroy$)).subscribe(res => {
            if (res) {
                this.endMinDate = res;
                this.holidayForm.patchValue({ endDate: res });
            }
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    updateHoliday() {
        const body: UpdateHolidayDto = {
            id: this.data.holiday.id,
            name: this.holidayForm.controls['name'].value,
            recurrence: this.holidayForm.controls['recurrence'].value,
            startDate: this.holidayForm.controls['startDate'].value,
            endDate: this.holidayForm.controls['endDate'].value
        }
        this.holidayService.holidayControllerUpdateHoliday(body).subscribe(res => {
            console.log('res holiday', res);
            this.toastr.success('Holiday Updated');
            this.dialogRef.close(true);
        })
    }

    delete() {
        this.holidayService.holidayControllerDeleteHoliday(this.data.holiday.id).subscribe(res => {
            this.toastr.success(' Holiday Removed ');
            this.dialogRef.close(true);
        })
    }

}
