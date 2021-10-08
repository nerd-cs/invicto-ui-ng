import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmService } from '@app-core/services/confirm.service';
import { ToastrService } from 'ngx-toastr';
import { AssignLocationDto, CreateCardDto, CreateUserDto, UsersService } from 'src/app/api_codegen';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
    selector: 'app-add-user-stepper',
    templateUrl: './add-user-stepper.component.html',
    styleUrls: ['./add-user-stepper.component.scss']
})
export class AddUserStepperComponent implements OnInit {

    step = 1;
    fromStep2 = false;
    fromStep3 = false;

    userInfo: any = {
        name: '',
        company: null,
        email: '',
        phone: '',
        role: '',
        sso: true
    };

    locationGroupData: any;
    cardData: any[] = [];

    constructor(
        private confirmService: ConfirmService,
        private dialogRef: MatDialogRef<AddUserStepperComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private userService: UsersService,
        private toastr: ToastrService,
    ) {
        if (this.data && this.data.step) {
            this.step = this.data.step;
            if (this.step === 2) { this.fromStep2 = true; }
            if (this.step === 3) { this.fromStep3 = true; }
        }
        if (this.data && this.data.role) {
            this.userInfo.role = this.data.role;
        }
    }

    ngOnInit(): void {
    }

    stepUpdate(evt: number) {
        this.step = evt;
    }

    setUserInfo(userInfo: any) {
        this.userInfo = userInfo.value;
    }

    setLocationGroup(evt: any) {
        this.locationGroupData = evt;
        if (this.fromStep2) {
            this.dialogRef.close(this.locationGroupData);
        }
    }

    setCardData(evt: any) {
        this.cardData.push(evt);
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
        if (!evt) {
            const data = {
                send: evt
            }
            this.dialogRef.close(data);
        } else {
            if (this.userInfo.role === 'Tier-admin') {
                this.userInfo.role = `Tier_Admin`
            }

            let cards: CreateCardDto[] = [];
            this.cardData.forEach((element: any) => {
                let item: CreateCardDto = {
                    type: element.type === 'Key card' ? 'KEY' : 'MOBILE',
                    activationDate: new Date(element.activationDate),
                }
                if (!element.noExpiration) {
                    item = { ...item, expirationDate: new Date(element.expirationDate) }
                }
                cards.push(item);
            })

            if (this.fromStep3) {
                this.dialogRef.close(cards);
                return;
            }

            let locations: AssignLocationDto[] = [];
            this.locationGroupData.accessItems.forEach((loc: any) => {
                const item = {
                    locationId: loc.location.id,
                    accessGroupIds: [...loc.group.map((g: any) => g.id)]
                }
                locations.push(item);
            })

            const newUser: CreateUserDto = {
                email: this.userInfo.email,
                fullName: this.userInfo.name,
                phoneNumber: `+1` + this.userInfo.phone,
                role: this.userInfo.role.toUpperCase() || 'MEMBER',
                allowSso: this.userInfo.sso,
                companyId: this.userInfo.company.id,
                locations: locations,
                cards: cards,
                // FIXME: send later case
                instantlyInvite: true
            }

            this.userService.usersControllerCreateUser(newUser).subscribe(res => {
                this.dialogRef.close({send: true});
            }, err => {
                this.toastr.error(err.error.message);
                this.dialogRef.close({send: false});
            });
        }
    }
}
