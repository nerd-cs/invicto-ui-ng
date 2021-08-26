import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmService } from '@app-core/services/confirm.service';
import { CreateUserDto, UsersService } from 'src/app/api_codegen';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
    selector: 'app-add-user-stepper',
    templateUrl: './add-user-stepper.component.html',
    styleUrls: ['./add-user-stepper.component.scss']
})
export class AddUserStepperComponent implements OnInit {

    step = 1;
    fromStep2 = false;
    role: string = '';

    userInfo: any;

    constructor(
        private confirmService: ConfirmService,
        private dialogRef: MatDialogRef<AddUserStepperComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private userService: UsersService
    ) {
        if (this.data && this.data.step) {
            this.step = this.data.step;
            if (this.step === 2) { this.fromStep2 = true; }
        }
        if (this.data && this.data.role) {
            this.role = this.data.role;
        }
    }

    ngOnInit(): void {
    }

    stepUpdate(evt: number) {
        this.step = evt;
    }

    setUserInfo(userInfo: any) {
        console.log(userInfo, 'user Info-------');
        this.userInfo = userInfo.value;
    }

    cancel(evt?: boolean) {
        let confirmDlg: MatDialogRef<ConfirmModalComponent, any>;
        if (this.fromStep2 && this.step > 2) {
            confirmDlg = this.confirmService.confirm('Quit Group Creation', 'QUIT');
        } else if (!this.fromStep2 && this.step > 1) {
            confirmDlg = this.confirmService.confirm('Quit User Creation', 'QUIT');
        } else {
            this.dialogRef.close(false);
            return;
        }

        confirmDlg.afterClosed().subscribe(res => {
            if (res) { this.dialogRef.close(false); }
        })
    }

    sendCard(evt: boolean) {
        const data = {
            send: evt
        }
        this.dialogRef.close(data);
        if (this.userInfo.role === 'Tier-admin') {
            this.userInfo.role = `Tier_Admin`
        }
        const newUser: CreateUserDto = {
            email: this.userInfo.email,
            fullName: this.userInfo.name,
            phoneNumber: `+1` + this.userInfo.phone,
            role: this.userInfo.role.toUpperCase() || 'MEMBER',
            allowSso: this.userInfo.sso,
            // TODO:
            locations: [
                {locationId: 2, accessGroupIds: [2]}
            ],
            cards: [
                {
                    type: 'KEY',
                    activationDate: new Date(),
                    expirationDate: new Date('2021-08-15T14:25:00.039Z'),
                    number: 123
                }
            ],
            instantlyInvite: true
        }
        this.userService.usersControllerCreateUser(newUser).subscribe(res => {
            console.log('new User ----', res);
        });
    }
}
