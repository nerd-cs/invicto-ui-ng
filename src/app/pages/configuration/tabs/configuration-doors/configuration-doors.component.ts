import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import * as moment from 'moment';

import { GlobalShareService } from '@app-core/services/global-share.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfDoorEditComponent } from '@app-pages/configuration/panels/conf-door-edit/conf-door-edit.component';
import { RightSideDlgAnimation } from '@app-core/models/common';


export type Status = 'Pending' | 'Paired' | 'Not pair';
export interface ConfDoorGroup {
    id: string;
    name: string;
    locations: string;
    zones: number;
    lastModified: Date | string;
    status: Status;
};

const STATUS: Status[] = [
    'Pending', 'Paired', 'Not pair'
];
const NAMES: string[] = ['Main Entrance', 'ID-546466', 'ID-849512'];
@Component({
    selector: 'app-configuration-doors',
    templateUrl: './configuration-doors.component.html',
    styleUrls: ['./configuration-doors.component.scss']
})
export class ConfigurationDoorsComponent implements OnInit {

    displayedColumns: string[] = ['nameSS', 'locations', 'zonesS', 'lastModified', 'status', 'actions'];
    dataSource: MatTableDataSource<ConfDoorGroup>;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private dialog: NgDialogAnimationService,


        private shareService: GlobalShareService
    ) {
        const users = Array.from({ length: 50 }, (_, k) => createTableData(k + 1));
        this.dataSource = new MatTableDataSource(users);
    }

    ngOnInit(): void {
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    edit(element: ConfDoorGroup) {
        this.dialog.open(ConfDoorEditComponent, {
            disableClose: false,
            panelClass: 'right-side-panel',
            animation: RightSideDlgAnimation,
            position: {
                rowStart: '1',
            }
        }).afterClosed().subscribe(res => {
            if (res) {
                console.log('res---', res);
            }
        });
    }
}

function createTableData(id: number): ConfDoorGroup {
    const name = NAMES[Math.round(Math.random() * 2)];

    return {
        id: id.toString(),
        name: name,
        locations: '211 Rue De La Gauchetiere, Quebec, J7K 0T8',
        zones: 5,
        lastModified: moment(new Date()).format('MM-DD-YYYY'),
        status: STATUS[Math.round(Math.random() * 2)]
    };
}
