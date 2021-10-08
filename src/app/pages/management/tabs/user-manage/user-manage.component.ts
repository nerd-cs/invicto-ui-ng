import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmService } from '@app-core/services/confirm.service';
import { GlobalShareService } from '@app-core/services/global-share.service';
import { InviteUserComponent } from '@app-pages/management/components/invite-user/invite-user.component';
import moment from 'moment';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';
import { UsersService, CreateCollaboratorDto } from 'src/app/api_codegen';

export type Role = 'Owner' | 'View' | 'Admin' | 'Access';
export type StatusType = 'Active' | 'Inactive';
export interface UserManagementData {
    id: string;
    name: string;
    avatar: any;
    activity: Date | string;
    role: Role;
    status: StatusType;
};

const STATUS: StatusType[] = [
    'Active', 'Inactive'
];

const ROLE: Role[] = [
    'Owner', 'View', 'Admin', 'Access'
];

const NAMES: string[] = [
    'Spencer Tunic', 'Patrice Michaud', 'Pete Bouchard', 'Marie Michèle', 'Jacqueline Bédard', 'Bobby Beaulieue', 'Mitch Flanagan'
];
@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.scss']
})
export class UserManageComponent implements OnInit {

    private destroy$ = new Subject();
    sidenavCollapsed!: boolean;

    displayedColumns: string[] = ['user', 'activity', 'role', 'status', 'actions'];
    dataSource: MatTableDataSource<UserManagementData>;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private dialog: NgDialogAnimationService,
        private confirmService: ConfirmService,
        private shareService: GlobalShareService,
        private usersService: UsersService
    ) {
        const users = Array.from({ length: 70 }, (_, k) => createTableData(k + 1));
        this.dataSource = new MatTableDataSource(users);
    }

    ngOnInit(): void {
        this.shareService.sidenavCollapsed$.pipe(takeUntil(this.destroy$)).subscribe(res => {
            this.sidenavCollapsed = res;
        });

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

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    openFilters() {
    }

    addUserManagement() {
        this.dialog.open(InviteUserComponent, {
            disableClose: false,
            panelClass: 'invite-user'
        }).afterClosed().subscribe(res => {
            if (res) {
                if (res.role === 'Tier-admin') {
                    res.role = `Tier_Admin`
                }
                const body: CreateCollaboratorDto = {
                    fullName: res.name,
                    email: res.email,
                    role: res.role.toUpperCase(),
                    companyId: 1
                }
                this.usersService.usersControllerCreateCollaborator(body).subscribe(res => {
                    console.log('hey -collaborator ----', res);
                    this.confirmService.openSnackBar('User has been invited ! 🎉🎉🎉');
                })
            }
        })
    }
}

function createTableData(id: number): UserManagementData {
    const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))]

    const role = ROLE[Math.round(Math.random() * 3)];

    return {
        id: id.toString(),
        name: name,
        avatar: '/assets/images/user.png',
        activity: moment(new Date()).format('MM-DD-YYYY'),
        role: role,
        status: STATUS[Math.round(Math.random() * 1)]
    };
}
