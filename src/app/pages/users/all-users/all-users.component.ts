import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import * as moment from 'moment';

import { ChangeUserStatusDto, User, UsersService } from 'src/app/api_codegen';
import { GlobalShareService } from '@app-core/services/global-share.service';
import { ConfirmService } from '@app-core/services/confirm.service';
import { RightSideDlgAnimation } from '@app-core/models/common';
import { AddUserStepperComponent } from '@app-shared/components/add-user-stepper/add-user-stepper.component';
import { QuickViewComponent } from './quick-view/quick-view.component';
import { FiltersPanelComponent } from './filters-panel/filters-panel.component';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-all-users',
    templateUrl: './all-users.component.html',
    styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements OnInit, OnDestroy {

    isLoading = false;
    private destroy$ = new Subject();
    sidenavCollapsed!: boolean;

    displayedColumns: string[] = ['name', 'lastActivity', 'accessGroups', 'status', 'actions'];
    dataSource: MatTableDataSource<User> = new MatTableDataSource();
    totalUsers: number = 0;
    today = new Date();

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private dialog: NgDialogAnimationService,
        private confirmService: ConfirmService,
        private shareService: GlobalShareService,
        private usersService: UsersService,
        private toastr: ToastrService,
    ) { }

    ngOnInit(): void {
        this.shareService.sidenavCollapsed$.pipe(takeUntil(this.destroy$)).subscribe(res => {
            this.sidenavCollapsed = res;
        });

        this.isLoading = true;
        this.getUserData();
        this.shareService.searchKey$.pipe(
            debounceTime(500),
            takeUntil(this.destroy$)
        ).subscribe(res => {
            this.dataSource.filter = res.trim().toLowerCase();

            if (this.dataSource.paginator) {
                this.dataSource.paginator.firstPage();
            }
        });

    }

    ngAfterViewInit() { }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    getUserData() {
        this.usersService.usersControllerGetAll().subscribe((users: User[]) => {
            console.log('Users ---', users);
            this.totalUsers = users.length;
            this.dataSource = new MatTableDataSource(users);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.isLoading = false;
        })
    }

    openFilters() {
        this.dialog.open(FiltersPanelComponent, {
            disableClose: false,
            panelClass: 'right-side-panel',
            animation: RightSideDlgAnimation,
            position: {
                rowStart: '1',
            }
        }).afterClosed().subscribe(res => {
            if (res) {
                console.log('filter panel res---', res);
            }
        });
    }

    async quickViewModal(id: number) {
        const userData = await this.usersService.usersControllerGetUserInfo(id).toPromise();
        this.dialog.open(QuickViewComponent, {
            disableClose: false,
            panelClass: 'right-side-panel',
            animation: RightSideDlgAnimation,
            position: {
                rowStart: '1',
            },
            data: {
                userData: userData
            }
        }).afterClosed().subscribe(res => {
            if (res) {
                console.log('quick view res---', res);
            }
        });
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

    async gotoUserDetail(element: User) {
        const id = element.id;
        const userData = await this.usersService.usersControllerGetUserInfo(id).toPromise();
        this.router.navigate(['user-detail'], { queryParams: { id: id }, relativeTo: this.route, state: userData });
    }

    resetPassword(id: number) {
        this.usersService.usersControllerResetPasswordForUser(id).subscribe(res => {
            this.toastr.info('Password Reset Email Sent');
        })
    }

    changeUserStatus(user: User, status: any) {
        const body = { status: status };
        this.usersService.usersControllerChangeUserStatus(body, user.id).subscribe(res => {
            console.log('user status changed --', res);
            if (res && status === 'ARCHIVED') {
                this.toastr.info('User Status Archived');
                this.getUserData();
            } else if (res && res.status === 'INACTIVE') {
                this.toastr.info('User Status Inactive');
                this.getUserData();
            }
        })
    }

    trackById(index: number, item: User): string {
        return `${item.id}`;
    }

}
