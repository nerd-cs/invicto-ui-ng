import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddUserStepperComponent } from '../add-user-stepper/add-user-stepper.component';

@Component({
    selector: 'app-custom-access-stepper',
    templateUrl: './custom-access-stepper.component.html',
    styleUrls: ['./custom-access-stepper.component.scss']
})
export class CustomAccessStepperComponent implements OnInit {

    step = 1;
    fromStep3 = false;

    constructor(
        private dialogRef: MatDialogRef<AddUserStepperComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        if (this.data && this.data.step) {
            this.step = this.data.step;
            if (this.step === 3) {
                this.fromStep3 = true;
            }
        }
     }

    ngOnInit(): void {
    }

    stepUpdate(evt: number) {
        this.step = evt;
    }

    cancel(evt?: boolean) {
        this.dialogRef.close(false);
    }

    save(evt: boolean) {
        const data = {
            save: evt
        }
        this.dialogRef.close(data);
    }
}
