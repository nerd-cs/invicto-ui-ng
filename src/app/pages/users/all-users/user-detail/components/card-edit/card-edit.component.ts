import { Component, EventEmitter, Inject, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { ConfirmService } from '@app-core/services/confirm.service';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { MY_FORMATS } from '@app-core/models/common';
import { CustomCalendarHeaderComponent } from '@app-shared/components/custom-calendar-header/custom-calendar-header.component';
import { UpdateUserCardDto, UsersService } from 'src/app/api_codegen';
import { ToastrService } from 'ngx-toastr';
const moment = _rollupMoment || _moment;

@Component({
    selector: 'app-card-edit',
    templateUrl: './card-edit.component.html',
    styleUrls: ['./card-edit.component.scss'],
    providers: [
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
        },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ]
})
export class CardEditComponent implements OnInit, OnDestroy {

    private destroy$ = new Subject();
    customCalendarHeader = CustomCalendarHeaderComponent;
    @Output() cancel: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() stepUpdate: EventEmitter<number> = new EventEmitter<number>();

    userId!: number;

    cardForm!: FormGroup;
    activationMinDate! : Date | string;
    expirationMinDate! : Date | string;
    cardInfo: any;

    constructor(
        private dialogRef: MatDialogRef<CardEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder,
        private confirmService: ConfirmService,
        private usersService: UsersService,
        private toastr: ToastrService
    ) {
        console.log('card edit -', this.data.card)
        this.cardInfo = this.data.card;
        this.userId = this.data.userId;
    }

    ngOnInit(): void {
        let noExpBoolean = false;
        if (!this.cardInfo.expirationDate) {
            noExpBoolean = true;
        }
        this.cardForm = this.fb.group({
            activationDate: [new Date(this.cardInfo.activationDate), Validators.required],
            expirationDate: [{ value: this.cardInfo?.expirationDate, disabled: noExpBoolean }],
            noExpiration: [noExpBoolean],
            status: [this.cardInfo.isActive],
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

    delete() {
        this.confirmService.confirm('Delete Card?', 'Delete').afterClosed().subscribe(res => {
            if (res) {
                this.dialogRef.close();
                this.confirmService.openSnackBar('Card has been Deleted !');
            }
        })
    }

    saveCard() {
        const updateCard: UpdateUserCardDto = {
            id: this.cardInfo.id,
            activationDate: this.cardForm.controls['activationDate'].value,
            expirationDate: this.cardForm.controls['expirationDate'].value,
            number: this.cardInfo.cardNumber,
            isActive: this.cardForm.controls['status'].value
        }
        console.log('update card --', updateCard);
        this.usersService.usersControllerUpdateUserCards(updateCard, this.userId).subscribe(res => {
            console.log('update card res---', res);
            this.toastr.success('Card Updated');
            this.dialogRef.close(true);
        })
    }
}
