import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-invite-user',
    templateUrl: './invite-user.component.html',
    styleUrls: ['./invite-user.component.scss']
})
export class InviteUserComponent implements OnInit {

    userInfoForm!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<InviteUserComponent>,
    ) { }

    ngOnInit(): void {
        this.userInfoForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            role: ['Member'],
            sso: [true]
        })
    }

    get emailInValidMessage() {
        if (this.userInfoForm.controls['email'].hasError('required') || this.userInfoForm.controls['phone'].hasError('required')) {
            return 'You must enter a value';
        }
        return this.userInfoForm.controls['email'].hasError('email') ? 'Not a valid email' : '';
    }

    sendInvite() {
        console.log('here-----', this.userInfoForm.value);
        this.dialogRef.close(this.userInfoForm.value);
    }

}
