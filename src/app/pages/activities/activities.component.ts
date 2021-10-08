import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { debounceTime, takeUntil } from 'rxjs/operators';
import * as moment from 'moment';

import { GlobalShareService } from '@app-core/services/global-share.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';

import { ConfirmService } from '@app-core/services/confirm.service';
import { RightSideDlgAnimation } from '@app-core/models/common';
import { ActivitiesFilterPanelComponent } from './activities-filter-panel/activities-filter-panel.component';

export type Access = 'Main Entrance' | '1100-BB' | '1F-02';
export type StatusType = 'Check-in' | 'Check-out' | 'Denied';
export interface ActivityData {
    id: string;
    name: string;
    avatar: any;
    activity: Date | string;
    access: Access;
    status: StatusType;
};

const STATUS: StatusType[] = [
    'Check-in', 'Check-out', 'Denied'
];

const ACCESS: Access[] = [
    'Main Entrance', '1100-BB', '1F-02'
];

const NAMES: string[] = [
    'Spencer Tunic', 'Patrice Michaud', 'Pete Bouchard', 'Marie Michèle', 'Jacqueline Bédard', 'Bobby Beaulieue', 'Mitch Flanagan'
];

@Component({
    selector: 'app-activities',
    templateUrl: './activities.component.html',
    styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit, OnDestroy {

    private destroy$ = new Subject();
    sidenavCollapsed!: boolean;

    displayedColumns: string[] = ['user', 'activity', 'access', 'status', 'actions'];
    dataSource: MatTableDataSource<ActivityData>;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private dialog: NgDialogAnimationService,
        private confirmService: ConfirmService,
        private shareService: GlobalShareService
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
        this.dialog.open(ActivitiesFilterPanelComponent, {
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
}

function createTableData(id: number): ActivityData {
    const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))]

    const accessTemp = ACCESS[Math.round(Math.random() * 2)];

    return {
        id: id.toString(),
        name: name,
        avatar: '/assets/images/user.png',
        activity: moment(new Date()).format('MM-DD-YYYY [at] h:mm a'),
        access: accessTemp,
        status: STATUS[Math.round(Math.random() * 2)]
    };
}
