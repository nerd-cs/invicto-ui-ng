import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgDialogAnimationService } from 'ng-dialog-animation';

import { GlobalShareService } from '@app-core/services/global-share.service';
import { CustomAccessStepperComponent } from '@app-shared/components/custom-access-stepper/custom-access-stepper.component';
import { ConfirmService } from '@app-core/services/confirm.service';
import { AccessGroupPanelComponent } from '@app-pages/control-access/panels/access-group-panel/access-group-panel.component';
import { RightSideDlgAnimation } from '@app-core/models/common';
import { AccessGroupService, CreateAccessGroupDto, HolidayService, LinkScheduleZoneDto, LocationService, ScheduleService, ZoneService } from 'src/app/api_codegen';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-control-access-groups',
    templateUrl: './control-access-groups.component.html',
    styleUrls: ['./control-access-groups.component.scss']
})
export class ControlAccessGroupsComponent implements OnInit, AfterViewInit, OnDestroy {
    private destroy$ = new Subject();

    displayedColumns: string[] = ['nameS', 'description', 'doorsSchedules', 'users', 'updatedAt', 'actions'];
    dataSource!: MatTableDataSource<any>;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    scheduleList: any[] = [];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private dialog: NgDialogAnimationService,
        private accessGroupService: AccessGroupService,
        private locationService: LocationService,
        private zoneService: ZoneService,
        private holidayService: HolidayService,
        private scheduleService: ScheduleService,
        private shareService: GlobalShareService,
        private confirmService: ConfirmService,
        private toastr: ToastrService
    ) { }

    ngOnInit(): void {
        this.accessGroupService.accessGroupControllerGetAccessGroupsPage().subscribe(res => {
            console.log(res.accessGroups, 'all access groups', res.total);
            let accessGroups: any[] = res.accessGroups;

            // accessGroups = accessGroups.map((item: any) => {
            //     let zoneScheduleNames: any[] = [];
            //     item.zoneSchedules.forEach((element: any) => {
            //         zoneScheduleNames.push(element.zone.name + ' @ ' + element.schedule.name)
            //     });
            //     return { ...item, zoneScheduleNames: zoneScheduleNames }
            // });
            this.dataSource = new MatTableDataSource(accessGroups);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        })

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

    async addControlAccessGroup() {
        const locations = await this.locationService.locationControllerGetAllForCompany().toPromise();
        this.dialog.open(CustomAccessStepperComponent, {
            disableClose: true,
            panelClass: 'custom-access-stepper',
            data: {
                step: 3,
                locations: locations,
                schedules: this.scheduleList,
            }
        }).afterClosed().subscribe(res => {
            console.log('stepper modal response ---', res);
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
                    this.refreshTable();
                })
            }
        })
    }

    refreshTable() {
        this.accessGroupService.accessGroupControllerGetAccessGroupsPage().subscribe(res => {
            this.dataSource.disconnect();
            this.dataSource = new MatTableDataSource(res.accessGroups);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        })
    }

    delete(id: number) {
        this.accessGroupService.accessGroupControllerDeleteAccessGroup(id).subscribe(res => {
            if (res) {
                this.refreshTable();
            }
        })
    }

    async edit(element: any) {
        console.log(element, 'hey works--element')
        const zones = await this.zoneService.zoneControllerGetAllForLocation(element.location.id).toPromise();
        this.dialog.open(AccessGroupPanelComponent, {
            disableClose: false,
            panelClass: 'right-side-panel',
            animation: RightSideDlgAnimation,
            position: {
                rowStart: '1',
            },
            data: {
                accessGroup: element,
                schedules: this.scheduleList,
                zones: zones
            }
        }).afterClosed().subscribe(res => {
            if (res) {
                this.refreshTable();
            }
        });
    }
}
