import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmService } from '@app-core/services/confirm.service';
import { LocalStorageService } from 'ngx-webstorage';
import { AccountService, UpdateAccountDto } from 'src/app/api_codegen';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-account-edit-panel',
    templateUrl: './account-edit-panel.component.html',
    styleUrls: ['./account-edit-panel.component.scss']
})
export class AccountEditPanelComponent implements OnInit {

    profileForm: FormGroup = new FormGroup({});
    account!: any;

    constructor(
        private dialogRef: MatDialogRef<AccountEditPanelComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder,
        private confirmService: ConfirmService,
        private router: Router,
        private storage: LocalStorageService,
        private accountService: AccountService
    ) {
        this.account = this.data.account;
    }

    ngOnInit(): void {
        this.profileForm = this.fb.group({
            name: [this.account.fullName, Validators.required],
            jobTitle: [this.account.jobTitle, Validators.required],
            company: [this.account.company.name, Validators.required],
            city: [this.account.city, Validators.required],
            country: [this.account.country, Validators.required],
        });
    }

    update() {
        const body: UpdateAccountDto = {
            fullName: this.profileForm.controls['name'].value,
            // profilePicture: '',
            jobTitle: this.profileForm.controls['jobTitle'].value,
            city: this.profileForm.controls['city'].value,
            country: this.profileForm.controls['country'].value,
            // email: this.account.email,
            // phoneNumber: this.account.phoneNumber,
            // oldPassword: '',
            // newPassword: ''
        }
        this.accountService.accountControllerUpdateAccount(body).subscribe(res => {
            this.dialogRef.close(true);
        })
    }

    delete() {
        this.confirmService.confirm('Delete Account?', 'DELETE').afterClosed().subscribe(res => {
            if (res) {
                this.accountService.accountControllerDeleteAccount().subscribe(() => {
                    this.dialogRef.close();
                    this.storage.clear(environment.webStorage.auth);
                    this.router.navigate(['login']);
                })
            }
        })
    }
}
