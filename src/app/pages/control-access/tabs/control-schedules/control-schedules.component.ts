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

@Component({
    selector: 'app-control-schedules',
    templateUrl: './control-schedules.component.html',
    styleUrls: ['./control-schedules.component.scss']
})

export class ControlSchedulesComponent implements OnInit {

    displayedColumns: string[] = ['nameS', 'description', 'holidays', 'updatedAt', 'actions'];
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
        private scheduleService: ScheduleService,
    ) { }

    ngOnInit(): void {
        this.getAllSchedules();
    }

    ngAfterViewInit() { }

    getAllSchedules() {
        this.scheduleService.scheduleControllerGetSchedulesPage().subscribe(res => {
            console.log('all schedule list--------', res);
            this.shareService.setScheduleList(res);
            this.dataSource = new MatTableDataSource(res.schedules);
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

    async edit(id: any) {
        const data = await this.scheduleService.scheduleControllerGetScheduleDescription(id).toPromise();
        this.dialog.open(SchedulePanelComponent, {
            disableClose: false,
            panelClass: 'right-side-panel',
            animation: RightSideDlgAnimation,
            position: {
                rowStart: '1',
            },
            data: {
                schedule: data
            }
        }).afterClosed().subscribe(res => {
            if (res) {
                this.getAllSchedules();
            }
        });
    }

    deleteSchedule(id: number) {
        this.scheduleService.scheduleControllerDeleteSchedule(id).subscribe(res => {
            this.getAllSchedules();
        })
    }
}
