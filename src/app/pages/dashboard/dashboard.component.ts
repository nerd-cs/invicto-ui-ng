import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmService } from '@app-core/services/confirm.service';
import { GlobalShareService } from '@app-core/services/global-share.service';
import { AddUserStepperComponent } from '@app-shared/components/add-user-stepper/add-user-stepper.component';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
    private destroy$ = new Subject();
    sidenavCollapsed!: boolean;

    constructor(
        private dialog: NgDialogAnimationService,
        private confirmService: ConfirmService,
        private shareService: GlobalShareService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.shareService.sidenavCollapsed$.pipe(takeUntil(this.destroy$)).subscribe(res => {
            this.sidenavCollapsed = res;
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    addUser() {
        this.dialog.open(AddUserStepperComponent, {
            disableClose: false,
            panelClass: 'add-user-stepper'
        }).afterClosed().subscribe(res => {
            console.log('stepper modal response ---', res);
            if (res && res.send) {
                this.confirmService.openSnackBar('User has been invited ! 🎉🎉🎉');
            } else if (res && !res.send) {
                this.confirmService.openSnackBar('Sorry, we are expecting troubles 🤔');
            }
        })
    }

    gotoUsers() {
        this.router.navigate(['users', 'all-users'])
    }

    gotoActivities() {
        this.router.navigate(['activities'])
    }
}
