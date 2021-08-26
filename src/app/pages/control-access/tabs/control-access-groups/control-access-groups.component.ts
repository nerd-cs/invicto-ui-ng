import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import * as moment from 'moment';

import { GlobalShareService } from '@app-core/services/global-share.service';
import { CustomAccessStepperComponent } from '@app-shared/components/custom-access-stepper/custom-access-stepper.component';
import { ConfirmService } from '@app-core/services/confirm.service';
import { AccessGroupPanelComponent } from '@app-pages/control-access/panels/access-group-panel/access-group-panel.component';
import { RightSideDlgAnimation } from '@app-core/models/common';
import { AccessGroupService, HolidayService, LocationService, ScheduleService, ZoneService } from 'src/app/api_codegen';

export interface ControlAccessGroup {
    id: string;
    name: string;
    description: string;
    doorsSchedules: string;
    users: number;
    lastUpdated: Date | string;
};

const NAMES: string[] = ['General', 'Suite 200', '145 Ave. Casgrain', 'HD - Suite 401'];
@Component({
    selector: 'app-control-access-groups',
    templateUrl: './control-access-groups.component.html',
    styleUrls: ['./control-access-groups.component.scss']
})
export class ControlAccessGroupsComponent implements OnInit {

    displayedColumns: string[] = ['nameS', 'description', 'doorsSchedules', 'users', 'lastUpdated', 'actions'];
    dataSource: MatTableDataSource<ControlAccessGroup>;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

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
        private confirmService: ConfirmService
    ) {
        const users = Array.from({ length: 50 }, (_, k) => createTableData(k + 1));
        this.dataSource = new MatTableDataSource(users);
    }

    ngOnInit(): void {
        this.locationService.locationControllerGetAllForCompany().subscribe(res => {
            console.log('locations---', res);
        })
        this.accessGroupService.accessGroupControllerGetAllForLocation(2).subscribe(res => {
            console.log('access group by location id---', res);
        })
        this.zoneService.zoneControllerGetAllForLocation(3).subscribe(res => {
            console.log('zone list ---', res);
        })
        this.scheduleService.scheduleControllerGetSchedulesList().subscribe(res => {
            console.log('schedule list --- ', res);
        })
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    addControlAccessGroup() {
        this.dialog.open(CustomAccessStepperComponent, {
            disableClose: false,
            panelClass: 'custom-access-stepper',
            data: {
                step: 3
            }
        }).afterClosed().subscribe(res => {
            console.log('stepper modal response ---', res);
            if (res && res.save) {
                this.confirmService.openSnackBar('New Access Group added ! 🎉🎉🎉');
            }
        })
    }

    edit(element: ControlAccessGroup) {
        this.dialog.open(AccessGroupPanelComponent, {
            disableClose: false,
            panelClass: 'right-side-panel',
            animation: RightSideDlgAnimation,
            position: {
                rowStart: '1',
            }
        }).afterClosed().subscribe(res => {
            if (res) {
                console.log('access group edit res---', res);
            }
        });
    }
}

function createTableData(id: number): ControlAccessGroup {
    const name = NAMES[Math.round(Math.random() * 3)];

    return {
        id: id.toString(),
        name: name,
        description: 'Lobby, Elevators',
        doorsSchedules: 'Zone 1,2,5',
        users: 45,
        lastUpdated: moment(new Date()).format('MM-DD-YYYY'),
    };
}
