import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import * as moment from 'moment';

import { GlobalShareService } from '@app-core/services/global-share.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfControllerEditComponent } from '@app-pages/configuration/panels/conf-controller-edit/conf-controller-edit.component';
import { RightSideDlgAnimation } from '@app-core/models/common';
import { ControllerService } from 'src/app/api_codegen';


export type Status = 'Pending' | 'Paired' | 'No Signal';
export interface ConfControllerGroup {
    id: string;
    name: string;
    locations: string;
    doors: number;
    lastModified: Date | string;
    status: Status;
};

const STATUS: Status[] = [
    'Pending', 'Paired', 'No Signal'
];
const NAMES: string[] = ['Desjardins HQ', 'ID-345345345', 'ID-156489562'];
@Component({
    selector: 'app-configuration-controllers',
    templateUrl: './configuration-controllers.component.html',
    styleUrls: ['./configuration-controllers.component.scss']
})
export class ConfigurationControllersComponent implements OnInit {

    displayedColumns: string[] = ['nameSS', 'locations', 'doors', 'lastModified', 'status', 'actions'];
    dataSource!: MatTableDataSource<any>;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private dialog: NgDialogAnimationService,
        private controllerService: ControllerService,
        private shareService: GlobalShareService
    ) {
    }

    ngOnInit(): void {
        this.controllerService.controllerControllerGetSchedulesPage(1, 100).subscribe(res => {
            console.log('controllers ---', res);
            this.dataSource = new MatTableDataSource(res);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        })
    }

    ngAfterViewInit() {
    }


    edit(controller: ConfControllerGroup) {
        this.dialog.open(ConfControllerEditComponent, {
            disableClose: false,
            panelClass: 'right-side-panel',
            animation: RightSideDlgAnimation,
            position: {
                rowStart: '1',
            },
            data: {
                controller: controller
            }
        }).afterClosed().subscribe(res => {
            if (res) {
                this.controllerService.controllerControllerGetSchedulesPage(1, 100).subscribe(res => {
                    this.dataSource.disconnect();
                    this.dataSource = new MatTableDataSource(res);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                })
            }
        });
    }
}

function createTableData(id: number): ConfControllerGroup {
    const name = NAMES[Math.round(Math.random() * 2)];

    return {
        id: id.toString(),
        name: name,
        locations: '211 Rue De La Gauchetiere, Quebec, J7K 0T8',
        doors: 12,
        lastModified: moment(new Date()).format('MM-DD-YYYY'),
        status: STATUS[Math.round(Math.random() * 2)]
    };
}
