import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { RightSideDlgAnimation } from '@app-core/models/common';
import { ConfirmService } from '@app-core/services/confirm.service';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { AccountEditPanelComponent } from './panels/account-edit-panel/account-edit-panel.component';
import { AccountService } from 'src/app/api_codegen/api/account.service';
import { PasswordEditPanelComponent } from './panels/password-edit-panel/password-edit-panel.component';
import { PhoneEditPanelComponent } from './panels/phone-edit-panel/phone-edit-panel.component';
import { TwoStepPanelComponent } from './panels/two-step-panel/two-step-panel.component';
import { CommunicationEditPanelComponent } from './panels/communication-edit-panel/communication-edit-panel.component';
import { SettingEditPanelComponent } from './panels/setting-edit-panel/setting-edit-panel.component';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

    account: any;
    isLoading = false;

    constructor(
        private dialog: NgDialogAnimationService,
        private confirmService: ConfirmService,
        public location: Location,
        private accountService: AccountService
    ) {
    }

    ngOnInit(): void {
        this.isLoading = true;
        this.accountService.accountControllerGetAccountInfo().subscribe((res: any) => {
            this.account = res;
            console.log('account info---', this.account);
            this.isLoading = false;
        })
    }

    edit() {
        this.dialog.open(AccountEditPanelComponent, {
            disableClose: false,
            panelClass: 'right-side-panel',
            animation: RightSideDlgAnimation,
            position: {
                rowStart: '1',
            },
            data: {
                account: this.account
            }
        }).afterClosed().subscribe(res => {
            if (res) {
                this.accountService.accountControllerGetAccountInfo().subscribe(response => {
                    this.account = response;
                })
                this.confirmService.openSnackBar('Information updated ! 🎉🎉🎉');
            }
        });
    }

    updatePassword() {
        this.dialog.open(PasswordEditPanelComponent, {
            disableClose: false,
            panelClass: 'right-side-panel',
            animation: RightSideDlgAnimation,
            position: {
                rowStart: '1',
            }
        }).afterClosed().subscribe(res => {
            if (res) {
                this.accountService.accountControllerGetAccountInfo().subscribe((response: any) => {
                    this.account = response;
                })
                this.confirmService.openSnackBar('Information updated ! 🎉🎉🎉');
            }
        });
    }

    updatePhone() {
        this.dialog.open(PhoneEditPanelComponent, {
            disableClose: false,
            panelClass: 'right-side-panel',
            animation: RightSideDlgAnimation,
            position: {
                rowStart: '1',
            },
            data: {
                phone: this.account.phoneNumber
            }
        }).afterClosed().subscribe(res => {
            if (res) {
                this.accountService.accountControllerGetAccountInfo().subscribe((response: any) => {
                    this.account = response;
                })
                this.confirmService.openSnackBar('Information updated ! 🎉🎉🎉');
            }
        });
    }

    updateTwoStep() {
        this.dialog.open(TwoStepPanelComponent, {
            disableClose: false,
            panelClass: 'right-side-panel',
            animation: RightSideDlgAnimation,
            position: {
                rowStart: '1',
            }
        }).afterClosed().subscribe();
    }

    communicationEdit() {
        this.dialog.open(CommunicationEditPanelComponent, {
            disableClose: false,
            panelClass: 'right-side-panel',
            animation: RightSideDlgAnimation,
            position: {
                rowStart: '1',
            }
        }).afterClosed().subscribe();
    }

    settingEdit() {
        this.dialog.open(SettingEditPanelComponent, {
            disableClose: false,
            panelClass: 'right-side-panel',
            animation: RightSideDlgAnimation,
            position: {
                rowStart: '1',
            }
        }).afterClosed().subscribe();
    }
}
