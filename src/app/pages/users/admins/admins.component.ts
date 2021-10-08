import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import * as moment from 'moment';

import { GlobalShareService } from '@app-core/services/global-share.service';
import { AddUserStepperComponent } from '@app-shared/components/add-user-stepper/add-user-stepper.component';
import { ConfirmService } from '@app-core/services/confirm.service';
import { User, UsersService } from 'src/app/api_codegen';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-admins',
    templateUrl: './admins.component.html',
    styleUrls: ['./admins.component.scss']
})
export class AdminsComponent implements OnInit, OnDestroy {

    isLoading = false;
    private destroy$ = new Subject();
    sidenavCollapsed!: boolean;

    displayedColumns: string[] = ['name', 'createdAt', 'company', 'permissions', 'status', 'actions'];
    dataSource: MatTableDataSource<User> = new MatTableDataSource();
    totalUsers: number = 0;
    today = new Date();

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private dialog: NgDialogAnimationService,
        private shareService: GlobalShareService,
        private confirmService: ConfirmService,
        private usersService: UsersService,
        private toastr: ToastrService
    ) { }

    ngOnInit(): void {
        this.shareService.sidenavCollapsed$.pipe(takeUntil(this.destroy$)).subscribe(res => {
            this.sidenavCollapsed = res;
        });

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
        this.isLoading = true;
        this.usersService.usersControllerGetUsersPage(undefined, undefined, 'ADMIN').subscribe(users => {
            console.log('Admin ---', users);
            this.totalUsers = users.total;
            this.dataSource = new MatTableDataSource(users.users as any);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.isLoading = false;
        }, err => {
            this.toastr.error('Fetching user data failed')
            this.isLoading = false;
        })
    }

    openSideModal(element: any) {
        return;
    }

    addAdmin() {
        this.dialog.open(AddUserStepperComponent, {
            disableClose: false,
            panelClass: 'add-user-stepper',
            data: {
                role: 'Admin'
            }
        }).afterClosed().subscribe(res => {
            console.log('stepper modal response ---', res);
            if (res && res.send) {
                this.getUserData()
                this.confirmService.openSnackBar('User has been invited ! 🎉🎉🎉');
            } else if (res && !res.send) {
                this.confirmService.openSnackBar('Sorry, we are expecting troubles 🤔');
            }
        })
    }

    async gotoUserDetail(element: User) {
        const id = element.id;
        const userData = await this.usersService.usersControllerGetUserInfo(id).toPromise();
        this.router.navigate(['admin-detail'], { queryParams: { id: id }, relativeTo: this.route, state: userData });
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
            } else if (res && res.status === 'INACTIVE') {
                this.toastr.info('User Status Inactive');
            } else if (res && res.status === 'ACTIVE') {
                this.toastr.info('User Status ACTIVE');
            }
            this.getUserData();
        })
    }
}
