import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { RightSideDlgAnimation } from '@app-core/models/common';
import { ConfirmService } from '@app-core/services/confirm.service';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { AccountEditPanelComponent } from './panels/account-edit-panel/account-edit-panel.component';
import { GoogleEditPanelComponent } from './panels/google-edit-panel/google-edit-panel.component';
import { AccountService } from 'src/app/api_codegen/api/account.service';

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

    googleAccount() {
        this.dialog.open(GoogleEditPanelComponent, {
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
}
