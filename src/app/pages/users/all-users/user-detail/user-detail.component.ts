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
import { AccessGroupService, AssignLocationDto, Company, CompanyService, CreateAccessGroupDto, CreateUserCardsDto, LinkScheduleZoneDto, LocationService, UpdateAccessGroupsDto, UserInfo, UsersService } from 'src/app/api_codegen';
import { DepartmentService } from '../../../../api_codegen/api/department.service';

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
    userData!: UserInfo;
    companyList: Company[] = [];
    scheduleList: any[] = [];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private cdRef: ChangeDetectorRef,
        private shareService: GlobalShareService,
        private dialog: NgDialogAnimationService,
        private usersService: UsersService,
        private toastr: ToastrService,
        private json2csvService: Json2CsvService,
        private confirmService: ConfirmService,
        private companyService: CompanyService,
        private departmentService: DepartmentService,
        private accessGroupService: AccessGroupService,
        private locationService: LocationService
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
        this.companyService.companyControllerGetAllCompanies().subscribe(res => {
            this.companyList = res;
        })
        // FIXME: Resolver;
        if (!this.userData) {
            this.getUserData();
        }

        this.shareService.sidenavCollapsed$.pipe(takeUntil(this.destroy$)).subscribe((res) => {
            this.sidenavCollapsed = res;
        });
    }

    ngAfterViewInit() {
        this.shareService.scheduleList$.pipe(
            takeUntil(this.destroy$)
        ).subscribe(res => {
            if (res) {
                this.scheduleList = res.schedules;
            }
        })
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    getUserData() {
        this.usersService.usersControllerGetUserInfo(this.userId).subscribe(res => {
            console.log('user Data ---', res);
            this.userData = res;
        })
    }

    gotoUserList() {
        this.router.navigate(['/users', 'all-users']);
    }

    async profileEdit() {
        const departmentList = await this.departmentService.departmentControllerGetAllForCompany(this.userData.company.id).toPromise()
        this.dialog.open(ProfileEditComponent, {
            disableClose: false,
            panelClass: 'right-side-panel',
            animation: RightSideDlgAnimation,
            position: {
                rowStart: '1',
            },
            data: {
                userData: this.userData,
                companyList: this.companyList,
                departmentList: departmentList
            }
        }).afterClosed().subscribe(res => {
            if (res) {
                this.usersService.usersControllerGetUserInfo(this.userId).subscribe(res => {
                    this.userData = res;
                })
            }
        });
    }

    // FIXME:
    addGroup() {
        this.dialog.open(AddUserStepperComponent, {
            disableClose: false,
            panelClass: 'add-user-stepper',
            data: {
                step: 2
            }
        }).afterClosed().subscribe(res => {
            console.log('stepper modal response ---', res);
            let locations: AssignLocationDto[] = [];
            res.accessItems.forEach((element: any) => {
                const item = {
                    locationId: element.location.id,
                    accessGroupIds: [...element.group.map((g: any) => g.id)]
                }
                locations.push(item);
            })
            const body: UpdateAccessGroupsDto = {
                locations: locations
            }
            this.usersService.usersControllerUpdateUserAccessGroups(body, this.userData.id).subscribe(res => {
                this.confirmService.openSnackBar('Access group has been added ! 🎉🎉🎉');
                this.getUserData();
            })
        })
    }

    addCard() {
        this.dialog.open(AddUserStepperComponent, {
            disableClose: false,
            panelClass: 'add-user-stepper',
            data: {
                step: 3
            }
        }).afterClosed().subscribe(res => {
            const body: CreateUserCardsDto = {
                cards: res
            }
            this.usersService.usersControllerCreateUserCards(body, this.userData.id).subscribe(res => {
                this.confirmService.openSnackBar('Card has been added ! 🎉🎉🎉');
                this.getUserData();
            })
        })
    }

    // customAccess() {
    //     this.dialog.open(CustomAccessStepperComponent, {
    //         disableClose: false,
    //         panelClass: 'custom-access-stepper',
    //     }).afterClosed().subscribe(res => {
    //         console.log('stepper modal response ---', res);
    //         if (res && res.save) {
    //             this.confirmService.openSnackBar('New Access Group added ! 🎉🎉🎉');
    //         }
    //     })
    // }

    async customAccess() {
        const locations = await this.locationService.locationControllerGetAllForCompany().toPromise();
        this.dialog.open(CustomAccessStepperComponent, {
            disableClose: true,
            panelClass: 'custom-access-stepper',
            data: {
                step: 3,
                locations: locations,
                schedules: this.scheduleList
            }
        }).afterClosed().subscribe(res => {
            if (res && res.save) {
                // TODO: SAVE ACCESS GROUP API ACTION HERE
                const data = res.save.data;
                let linkScheduleZoneArray: Array<LinkScheduleZoneDto> = [];
                data.zoneDoorItems.forEach((zs: any) => {
                    const item = { zoneId: zs.zoneDoor.id, scheduleId: zs.schedule.id };
                    linkScheduleZoneArray.push(item);
                })
                const body: CreateAccessGroupDto = {
                    name: data.name,
                    locationId: data.location.id,
                    zoneSchedules: linkScheduleZoneArray
                }

                this.accessGroupService.accessGroupControllerCreateAccessGroup(body).subscribe(res => {
                    this.confirmService.openSnackBar('New Access Group added ! 🎉🎉🎉');
                    this.getUserData()
                })
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
