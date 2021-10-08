import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import * as moment from 'moment';

import { GlobalShareService } from '@app-core/services/global-share.service';
import { ActivatedRoute, Router } from '@angular/router';

import { AddHolidayModalComponent } from '@app-pages/control-access/components/add-holiday-modal/add-holiday-modal.component';
import { ConfirmService } from '@app-core/services/confirm.service';
import { HolidayPanelComponent } from '@app-pages/control-access/panels/holiday-panel/holiday-panel.component';
import { RightSideDlgAnimation } from '@app-core/models/common';
import { HolidayService } from 'src/app/api_codegen';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-control-holidays',
    templateUrl: './control-holidays.component.html',
    styleUrls: ['./control-holidays.component.scss']
})
export class ControlHolidaysComponent implements OnInit {

    displayedColumns: string[] = ['nameS', 'fromToDate', 'recurrence', 'updatedAt', 'actions'];
    dataSource!: MatTableDataSource<any>;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private dialog: NgDialogAnimationService,
        private confirmService: ConfirmService,
        private shareService: GlobalShareService,
        private holidayService: HolidayService,
        private toastr: ToastrService
    ) { }

    ngOnInit(): void {
        this.holidayService.holidayControllerGetAllHolidays().subscribe(holidays => {
            this.dataSource = new MatTableDataSource(holidays);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        })
    }

    ngAfterViewInit() {
    }

    addHoliday() {
        this.dialog.open(AddHolidayModalComponent, {
            disableClose: false,
            panelClass: 'holiday-panel',
        }).afterClosed().subscribe(res => {
            if (res) {
                this.holidayService.holidayControllerGetAllHolidays().subscribe(holidays => {
                    this.dataSource = new MatTableDataSource(holidays);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                })
                this.confirmService.openSnackBar('New Holiday added ! 🎉🎉🎉');
            }
        })
    }

    edit(holiday: any) {
        this.dialog.open(HolidayPanelComponent, {
            disableClose: false,
            panelClass: 'right-side-panel',
            animation: RightSideDlgAnimation,
            position: {
                rowStart: '1',
            },
            data: {
                holiday: holiday
            }
        }).afterClosed().subscribe(res => {
            if (res) {
                this.holidayService.holidayControllerGetAllHolidays().subscribe(holidays => {
                    this.dataSource.disconnect();
                    this.dataSource = new MatTableDataSource(holidays);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                })
            }
        });
    }

    deleteHoliday(holiday: any) {
        this.holidayService.holidayControllerDeleteHoliday(holiday.id).subscribe(res => {
            this.toastr.success(' Holiday Removed ');
            this.holidayService.holidayControllerGetAllHolidays().subscribe(holidays => {
                this.dataSource.disconnect();
                this.dataSource = new MatTableDataSource(holidays);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            })
        })
    }
}
