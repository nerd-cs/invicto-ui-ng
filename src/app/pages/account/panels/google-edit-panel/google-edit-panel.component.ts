import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AppValidators } from '@app-core/utils/app-validators';
import { AccountService, UpdateAccountDto } from 'src/app/api_codegen';

@Component({
  selector: 'app-google-edit-panel',
  templateUrl: './google-edit-panel.component.html',
  styleUrls: ['./google-edit-panel.component.scss']
})
export class GoogleEditPanelComponent implements OnInit {

    googleForm: FormGroup = new FormGroup({});
    hide = true;

    constructor(
        private dialogRef: MatDialogRef<GoogleEditPanelComponent>,
        private fb: FormBuilder,
        private accountService: AccountService
    ) { }

    ngOnInit(): void {
        this.googleForm = this.fb.group({
            old: ['', Validators.required],
            password: ['', [
                Validators.required,
                Validators.minLength(8),
                AppValidators.patternValidator(/[0-9]/, { hasNumber: true }),
                AppValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
                AppValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
                AppValidators.patternValidator(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/, { hasSpecialCharacters: true })
            ]],
            confirm: ['', [Validators.required]]
        }, { validators: AppValidators.passwordMatchValidator() })
    }

    update() {
        const body: UpdateAccountDto = {
            oldPassword: this.googleForm.controls['old'].value,
            newPassword: this.googleForm.controls['confirm'].value
        }
        this.accountService.accountControllerUpdateAccount(body).subscribe(res => {
            this.dialogRef.close(true)
        })
    }

}
