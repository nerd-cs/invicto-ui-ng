import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { MY_FORMATS } from '@app-core/models/common';
import { CustomCalendarHeaderComponent } from '../../../custom-calendar-header/custom-calendar-header.component';
const moment = _rollupMoment || _moment;

@Component({
    selector: 'app-create-card',
    templateUrl: './create-card.component.html',
    styleUrls: ['./create-card.component.scss'],
    providers: [
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
        },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ]
})
export class CreateCardComponent implements OnInit, OnDestroy {

    private destroy$ = new Subject();
    customCalendarHeader = CustomCalendarHeaderComponent;
    @Input() fromStep3: boolean = false;
    @Output() cancel: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() stepUpdate: EventEmitter<number> = new EventEmitter<number>();
    @Output() cardData: EventEmitter<any> = new EventEmitter<any>();

    cardForm!: FormGroup;
    activationMinDate = new Date();
    expirationMinDate = new Date();

    constructor(
        private fb: FormBuilder
    ) {
        console.log('this.fromStep3', this.fromStep3);
    }

    ngOnInit(): void {
        this.cardForm = this.fb.group({
            type: ['Key card', Validators.required],
            activationDate: ['', Validators.required],
            expirationDate: [{value: '', disabled: false}],
            noExpiration: [false]
        });
        this.cardForm.controls['activationDate'].valueChanges.pipe(takeUntil(this.destroy$)).subscribe(res => {
            if (res && !this.noExp) {
                this.expirationMinDate = res;
            }
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    get noExp() {
        return this.cardForm.controls['noExpiration'].value;
    }
    setNoExpiration() {
        this.noExp ? this.cardForm.controls['expirationDate'].enable() : this.cardForm.controls['expirationDate'].disable();
    }

    close() {
        this.cancel.emit(true);
    }
    gotoStep(step: number) {
        this.cardData.emit(this.cardForm.value)
        this.stepUpdate.emit(step);
    }
    nextStep() {
        if (this.cardForm.controls['type'].value === 'Key card') {
            this.gotoStep(4);
        } else {
            this.gotoStep(5);
        }
    }
}
