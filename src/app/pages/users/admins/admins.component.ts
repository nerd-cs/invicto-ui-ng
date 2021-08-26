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

@Component({
    selector: 'app-admins',
    templateUrl: './admins.component.html',
    styleUrls: ['./admins.component.scss']
})
export class AdminsComponent implements OnInit, OnDestroy {

    isLoading = false;
    private destroy$ = new Subject();
    sidenavCollapsed!: boolean;

    displayedColumns: string[] = ['name', 'lastActivity', 'permissions', 'status', 'actions'];
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
        private usersService: UsersService
    ) { }

    ngOnInit(): void {
        this.shareService.sidenavCollapsed$.pipe(takeUntil(this.destroy$)).subscribe(res => {
            this.sidenavCollapsed = res;
        });

        this.isLoading = true;
        this.usersService.usersControllerGetUsersPage(1, 100, 'ADMIN').subscribe((users: User[]) => {
            console.log('Admin ---', users);
            this.totalUsers = users.length;
            this.dataSource = new MatTableDataSource(users);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.isLoading = false;
        })

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
                this.confirmService.openSnackBar('User has been invited ! 🎉🎉🎉');
            } else if (res && !res.send) {
                this.confirmService.openSnackBar('Sorry, we are expecting troubles 🤔');
            }
        })
    }

    gotoAdmin(element: User) {
        const id = element.id;
        this.router.navigate(['admin-detail'], { queryParams: { id: id }, relativeTo: this.route, state: element });
    }

}
