import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppValidators } from '@app-core/utils/app-validators';
import { AccountService, UpdateAccountDto } from 'src/app/api_codegen';
import { PasswordEditPanelComponent } from '../password-edit-panel/password-edit-panel.component';

@Component({
  selector: 'app-phone-edit-panel',
  templateUrl: './phone-edit-panel.component.html',
  styleUrls: ['./phone-edit-panel.component.scss']
})
export class PhoneEditPanelComponent implements OnInit {
    phoneForm: FormGroup = new FormGroup({});

    constructor(
        private dialogRef: MatDialogRef<PasswordEditPanelComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder,
        private accountService: AccountService
    ) { }

    ngOnInit(): void {
        console.log(this.data)
        this.phoneForm = this.fb.group({
            phone: [this.data.phone.slice(2), Validators.required],
        })
    }

    update() {
        const body: UpdateAccountDto = {
            phoneNumber: `+1` + this.phoneForm.controls['phone'].value,
        }
        this.accountService.accountControllerUpdateAccount(body).subscribe(res => {
            this.dialogRef.close(true)
        })
    }

}
