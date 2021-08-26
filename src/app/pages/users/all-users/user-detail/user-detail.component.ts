import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { ToastrService } from 'ngx-toastr';

import * as moment from 'moment';


import { Json2CsvService } from '@app-core/services/json-to-csv.service';
import { GlobalShareService } from '@app-core/services/global-share.service';
import { AddUserStepperComponent } from '@app-shared/components/add-user-stepper/add-user-stepper.component';
import { CustomAccessStepperComponent } from '@app-shared/components/custom-access-stepper/custom-access-stepper.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { ConfirmService } from '@app-core/services/confirm.service';
import { RightSideDlgAnimation } from '@app-core/models/common';
import { UsersService } from 'src/app/api_codegen';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, OnDestroy {

    private destroy$ = new Subject();
    sidenavCollapsed!: boolean;
    exportActivitiesData: any;

    userId!: number;
    userData!: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private cdRef: ChangeDetectorRef,
        private shareService: GlobalShareService,
        private dialog: NgDialogAnimationService,
        private usersService: UsersService,
        private toastr: ToastrService,
        private json2csvService: Json2CsvService,
        private confirmService: ConfirmService

    ) {
        const navigation = this.router.getCurrentNavigation() as any;
        const initialData = navigation.extras.state;
        this.route.queryParams.subscribe(params => {
            console.log(params, 'query params ---', initialData);
            this.userId = params.id
        })
        this.userData = initialData;
    }

    ngOnInit(): void {
        // FIXME: Resolver;
        if (!this.userData) {
            this.usersService.usersControllerGetUserInfo(this.userId).subscribe(res => {
                console.log('user Data ---', res);
                this.userData = res;
            })
        }
        this.shareService.sidenavCollapsed$.pipe(takeUntil(this.destroy$)).subscribe((res) => {
            this.sidenavCollapsed = res;
        });
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    gotoUserList() {
        this.router.navigate(['/users', 'all-users']);
    }

    profileEdit() {
        this.dialog.open(ProfileEditComponent, {
            disableClose: false,
            panelClass: 'right-side-panel',
            animation: RightSideDlgAnimation,
            position: {
                rowStart: '1',
            },
            data: {
                userData: this.userData
            }
        }).afterClosed().subscribe(res => {
            if (res) {
                this.usersService.usersControllerGetUserInfo(this.userId).subscribe(res => {
                    this.userData = res;
                })
            }
        });
    }

    addGroup() {
        this.dialog.open(AddUserStepperComponent, {
            disableClose: false,
            panelClass: 'add-user-stepper',
            data: {
                step: 2
            }
        }).afterClosed().subscribe(res => {
            console.log('stepper modal response ---', res);
            if (res && res.send) {
                this.confirmService.openSnackBar('Group has been added ! 🎉🎉🎉');
            } else if (res && !res.send) {
                this.confirmService.openSnackBar('Sorry, we are expecting troubles 🤔');
            }
        })
    }

    addCard() {
        this.dialog.open(AddUserStepperComponent, {
            disableClose: false,
            panelClass: 'add-user-stepper',
            data: {
                step: 2
            }
        }).afterClosed().subscribe(res => {
            if (res && res.send) {
                this.confirmService.openSnackBar('User has been invited ! 🎉🎉🎉');
            } else if (res && !res.send) {
                this.confirmService.openSnackBar('Sorry, we are expecting troubles 🤔');
            }
        })
    }

    customAccess() {
        this.dialog.open(CustomAccessStepperComponent, {
            disableClose: false,
            panelClass: 'custom-access-stepper',
        }).afterClosed().subscribe(res => {
            console.log('stepper modal response ---', res);
            if (res && res.save) {
                this.confirmService.openSnackBar('New Access Group added ! 🎉🎉🎉');
            }
        })
    }

    exportActivities() {
        this.confirmService.confirm('Download CSV', 'YES').afterClosed().subscribe(res => {
            if (res) {
                const name = 'Activities' + moment(new Date()).format('MM-DD-YY');
                this.json2csvService.downloadFile(this.exportActivitiesData, name);
                this.confirmService.openSnackBar('Export Activities 🎉');
            }
        })
    }

    getActivitiesData(evt: any) {
        this.exportActivitiesData = evt;
    }

    updateUserData(evt: boolean) {
        if (evt) {
            // FIXME:
            this.usersService.usersControllerGetUserInfo(this.userId).subscribe(res => {
                console.log('--------------------', res)
                this.userData = res;
            })
        }
    }

}
