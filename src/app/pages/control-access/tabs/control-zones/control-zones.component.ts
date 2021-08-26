import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import * as moment from 'moment';

import { GlobalShareService } from '@app-core/services/global-share.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ZonePanelComponent } from '@app-pages/control-access/panels/zone-panel/zone-panel.component';
import { RightSideDlgAnimation } from '@app-core/models/common';
import { AddZoneModalComponent } from '@app-pages/control-access/components/add-zone-modal/add-zone-modal.component';
import { ConfirmService } from '@app-core/services/confirm.service';


export interface ControlZone {
    id: string;
    name: string;
    description: string;
    numberOfDoor: number;
    lastUpdated: Date | string;
};

const NAMES: string[] = ['All Doors', 'Lobby', 'Terasse', 'Garage'];
@Component({
  selector: 'app-control-zones',
  templateUrl: './control-zones.component.html',
  styleUrls: ['./control-zones.component.scss']
})
export class ControlZonesComponent implements OnInit {

    displayedColumns: string[] = ['nameS', 'description', 'numberOfDoor', 'lastUpdated', 'actions'];
    dataSource: MatTableDataSource<ControlZone>;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private dialog: NgDialogAnimationService,
        private confirmService: ConfirmService,
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

    addControlZone() {
        this.dialog.open(AddZoneModalComponent, {
            disableClose: false,
            panelClass: 'control-add-zone',
        }).afterClosed().subscribe(res => {
            if (res) {
                this.confirmService.openSnackBar('New Zone added ! 🎉🎉🎉');
            }
        })
    }

    edit(element: ControlZone) {
        this.dialog.open(ZonePanelComponent, {
            disableClose: false,
            panelClass: 'right-side-panel',
            animation: RightSideDlgAnimation,
            position: {
                rowStart: '1',
            }
        }).afterClosed().subscribe(res => {
            if (res) {
                console.log('zone edit res---', res);
            }
        });
    }
}

function createTableData(id: number): ControlZone {
    const name = NAMES[Math.round(Math.random() * 3)];

    return {
        id: id.toString(),
        name: name,
        description: '24/7 All Floors',
        numberOfDoor: 49,
        lastUpdated: moment(new Date()).format('MM-DD-YYYY'),
    };
}
