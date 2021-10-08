import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MY_FORMATS } from '@app-core/models/common';
import { CustomCalendarHeaderComponent } from '@app-shared/components/custom-calendar-header/custom-calendar-header.component';
import { CreateHolidayDto, HolidayService } from 'src/app/api_codegen';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-add-holiday-modal',
    templateUrl: './add-holiday-modal.component.html',
    styleUrls: ['./add-holiday-modal.component.scss'],
    providers: [
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
        },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ]
})
export class AddHolidayModalComponent implements OnInit {

    private destroy$ = new Subject();
    customCalendarHeader = CustomCalendarHeaderComponent;

    holidayForm!: FormGroup;
    startMinDate = null;
    endMinDate = new Date();

    constructor(
        private dialogRef: MatDialogRef<AddHolidayModalComponent>,
        private fb: FormBuilder,
        private holidayService: HolidayService,
        private toastr: ToastrService
    ) { }

    ngOnInit(): void {
        this.holidayForm = this.fb.group({
            name: ['', Validators.required],
            recurrence: ['', Validators.required],
            startDate: [],
            endDate: [],
        });
        this.holidayForm.controls['startDate'].valueChanges.pipe(takeUntil(this.destroy$)).subscribe(res => {
            if (res) {
                this.endMinDate = res;
                this.holidayForm.patchValue({endDate: res});
            }
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    cancel() {
        this.dialogRef.close(false);
    }

    save() {
        const body: CreateHolidayDto = {
            name: this.holidayForm.controls['name'].value,
            recurrence: this.holidayForm.controls['recurrence'].value,
            startDate: this.holidayForm.controls['startDate'].value,
            endDate: this.holidayForm.controls['endDate'].value
        }
        this.holidayService.holidayControllerCreateHoliday(body).subscribe(res => {
            console.log('new holiday', res)
            this.toastr.success('Holiday Created')
            this.dialogRef.close(res);
        })
    }

}
