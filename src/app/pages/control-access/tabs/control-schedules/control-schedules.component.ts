import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import * as moment from 'moment';

import { GlobalShareService } from '@app-core/services/global-share.service';
import { ActivatedRoute, Router } from '@angular/router';

import { AddScheduleModalComponent } from '@app-pages/control-access/components/add-schedule-modal/add-schedule-modal.component';
import { ConfirmService } from '@app-core/services/confirm.service';
import { SchedulePanelComponent } from '@app-pages/control-access/panels/schedule-panel/schedule-panel.component';
import { RightSideDlgAnimation } from '@app-core/models/common';
import { ToastrService } from 'ngx-toastr';
import { ScheduleService } from 'src/app/api_codegen';

export interface ControlSchedule {
    id: string;
    name: string;
    description: string;
    holidays: string;
    lastUpdated: Date | string;
};

const NAMES: string[] = ['Cleaning Team', 'Employee', 'IT service', 'Day to day'];
@Component({
    selector: 'app-control-schedules',
    templateUrl: './control-schedules.component.html',
    styleUrls: ['./control-schedules.component.scss']
})
export class ControlSchedulesComponent implements OnInit {

    displayedColumns: string[] = ['nameS', 'description', 'holidays', 'lastUpdated', 'actions'];
    dataSource!: MatTableDataSource<any>;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private dialog: NgDialogAnimationService,
        private confirmService: ConfirmService,
        private shareService: GlobalShareService,
        private toastr: ToastrService,
        private scheduleService: ScheduleService
    ) { }

    ngOnInit(): void {
        this.getAllSchedules();
    }

    ngAfterViewInit() {

    }

    getAllSchedules() {
        this.scheduleService.scheduleControllerGetSchedulesList().subscribe(res => {
            console.log('schedule ---', res);
            this.dataSource = new MatTableDataSource(res);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        })
    }

    addControlSchedule() {
        this.dialog.open(AddScheduleModalComponent, {
            disableClose: false,
            panelClass: 'control-add-schedule',
        }).afterClosed().subscribe(res => {
            if (res) {
                this.getAllSchedules();
                this.confirmService.openSnackBar('New Schedule added ! 🎉🎉🎉');
            }
        })
    }

    edit(element: ControlSchedule) {
        this.dialog.open(SchedulePanelComponent, {
            disableClose: false,
            panelClass: 'right-side-panel',
            animation: RightSideDlgAnimation,
            position: {
                rowStart: '1',
            }
        }).afterClosed().subscribe(res => {
            if (res) {
                console.log('schedule edit res---', res);
            }
        });
    }
}

function createTableData(id: number): ControlSchedule {
    const name = NAMES[Math.round(Math.random() * 3)];

    return {
        id: id.toString(),
        name: name,
        description: '24/7 All Floors',
        holidays: 'Christmas',
        lastUpdated: moment(new Date()).format('MM-DD-YYYY'),
    };
}
