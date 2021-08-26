import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { RightSideDlgAnimation } from '@app-core/models/common';
import { ConfirmService } from '@app-core/services/confirm.service';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { AccountEditPanelComponent } from './panels/account-edit-panel/account-edit-panel.component';
import { GoogleEditPanelComponent } from './panels/google-edit-panel/google-edit-panel.component';
import { AccountService } from 'src/app/api_codegen';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

    account!: any;

    constructor(
        private dialog: NgDialogAnimationService,
        private confirmService: ConfirmService,
        public location: Location,
        private accountService: AccountService
    ) { }

    ngOnInit(): void {
        this.accountService.accountControllerGetAccountInfo().subscribe(res => {
            this.account = res;
            console.log('account info---', this.account);
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
                this.accountService.accountControllerGetAccountInfo().subscribe(res => {
                    this.account = res;
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
                this.accountService.accountControllerGetAccountInfo().subscribe(res => {
                    this.account = res;
                })
                this.confirmService.openSnackBar('Information updated ! 🎉🎉🎉');
            }
        });
    }
}
