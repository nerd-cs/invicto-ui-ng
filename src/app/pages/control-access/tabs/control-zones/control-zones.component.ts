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
import { ConfirmService } from '@app-core/services/confirm.service';
import { LocationService, ZoneService } from 'src/app/api_codegen';
import { AddZoneStepperComponent } from '@app-pages/control-access/components/add-zone-stepper/add-zone-stepper.component';

@Component({
    selector: 'app-control-zones',
    templateUrl: './control-zones.component.html',
    styleUrls: ['./control-zones.component.scss']
})
export class ControlZonesComponent implements OnInit {

    displayedColumns: string[] = ['nameS', 'description', 'location', 'updatedAt', 'actions'];
    dataSource!: MatTableDataSource<any>;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private dialog: NgDialogAnimationService,
        private confirmService: ConfirmService,
        private shareService: GlobalShareService,
        private zoneService: ZoneService,
        private locationService: LocationService
    ) {
    }

    ngOnInit(): void {
        this.getAllZones()
    }

    ngAfterViewInit() { }

    getAllZones() {
        this.zoneService.zoneControllerGetZonesPage().subscribe(res => {
            console.log('zone page list', res)
            this.dataSource = new MatTableDataSource(res.zones);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        })
    }

    async addControlZone() {
        const locations = await this.locationService.locationControllerGetAllForCompany().toPromise();
        this.dialog.open(AddZoneStepperComponent, {
            disableClose: false,
            panelClass: 'add-zone-stepper',
            data: {
                locations: locations
            }
        }).afterClosed().subscribe(res => {
            if (res) {
                this.getAllZones()
            }
        })
    }

    delete(element: any) {
        this.zoneService.zoneControllerDeleteZone(element.id).subscribe(res => {
            if (res) {
                this.getAllZones();
            }
        })
    }

    edit(element: any) {
        this.dialog.open(ZonePanelComponent, {
            disableClose: false,
            panelClass: 'right-side-panel',
            animation: RightSideDlgAnimation,
            position: {
                rowStart: '1',
            },
            data: {
                zoneData: element
            }
        }).afterClosed().subscribe(res => {
            if (res) {
                this.dataSource.disconnect();
                this.getAllZones();
            }
        });
    }
}
