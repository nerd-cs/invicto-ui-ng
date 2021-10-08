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
import { DoorResponse, DoorService } from 'src/app/api_codegen';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-configuration-doors',
    templateUrl: './configuration-doors.component.html',
    styleUrls: ['./configuration-doors.component.scss']
})
export class ConfigurationDoorsComponent implements OnInit {

    displayedColumns: string[] = ['nameSS', 'locations', 'zonesS', 'lastModified', 'status', 'actions'];
    dataSource!: MatTableDataSource<DoorResponse>;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private dialog: NgDialogAnimationService,
        private shareService: GlobalShareService,
        private doorService: DoorService,
        private toastr: ToastrService
    ) { }

    ngOnInit(): void {
        this.doorService.doorControllerGetDoorsPage().subscribe(res => {
            console.log('doors --- hey', res)
            this.dataSource = new MatTableDataSource(res.doors);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        })
    }

    async edit(door: DoorResponse) {
        const doorDetails = await this.doorService.doorControllerGetDoorInfo(door.id).toPromise();
        this.dialog.open(ConfDoorEditComponent, {
            disableClose: false,
            panelClass: 'right-side-panel',
            animation: RightSideDlgAnimation,
            position: {
                rowStart: '1',
            },
            data: {
                door: doorDetails
            }
        }).afterClosed().subscribe(res => {
            if (res) {
                this.doorService.doorControllerGetDoorsPage().subscribe(res => {
                    this.dataSource.disconnect();
                    this.dataSource = new MatTableDataSource(res.doors);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                })
            }
        });
    }

    testDoor(id: number) {
        this.doorService.doorControllerTestDoor(id).subscribe(res => {
            this.toastr.success('Door Testing !');
        })
    }
}
