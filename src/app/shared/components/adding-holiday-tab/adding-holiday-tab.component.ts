import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MY_FORMATS } from '@app-core/models/common';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CreateHolidayDto, HolidayService } from 'src/app/api_codegen';
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

    isLoading = false;
    searchKey: any;
    private destroy$ = new Subject();
    customCalendarHeader = CustomCalendarHeaderComponent;

    holidays: any[] = [
        // { name: 'Christmas', checked: false },
    ]
    holidayForm!: FormGroup;
    startMinDate = null;
    endMinDate = new Date();

    tabIndex = 0;
    preSelected: any = [];

    constructor(
        private dialogRef: MatDialogRef<AddingHolidayTabComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder,
        private holidayService: HolidayService,
        private toastr: ToastrService
    ) {
        if (data && data.selectedHoliday) {
            this.preSelected = data.selectedHoliday.map((item: any) => item.id)
        }
        console.log('this.preSelected---', this.preSelected);
    }

    ngOnInit(): void {
        this.isLoading = true;
        this.holidayService.holidayControllerGetAllHolidays().subscribe(holidays => {
            holidays.forEach((element: any) => {
                if (this.preSelected.includes(element.id)) {
                    const ele = {...element, checked: true}
                    this.holidays.push(ele)
                } else {
                    const ele = {...element, checked: false}
                    this.holidays.push(ele)
                }
            });
            this.isLoading = false;
            console.log(this.holidays, '--------HOL----')
        })
        this.holidayForm = this.fb.group({
            name: ['', Validators.required],
            recurrence: ['ONCE', Validators.required],
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
        if (this.tabIndex === 1) {
            const body: CreateHolidayDto = {
                name: this.holidayForm.controls['name'].value,
                recurrence: this.holidayForm.controls['recurrence'].value,
                startDate: this.holidayForm.controls['startDate'].value,
                endDate: this.holidayForm.controls['endDate'].value
            }
            this.holidayService.holidayControllerCreateHoliday(body).subscribe(res => {
                this.toastr.success('Holiday Created');
                this.holidays.push({...res, checked: false});
                this.tabIndex = 0;
            })
        } else if (this.tabIndex === 0) {
            this.dialogRef.close(this.holidays.filter(item => item.checked));
        }
    }
}
