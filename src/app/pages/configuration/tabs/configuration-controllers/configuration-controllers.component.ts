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
import { ControllerResponse, ControllerService } from 'src/app/api_codegen';
import { ToastrService } from 'ngx-toastr';


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
        private shareService: GlobalShareService,
        private toastr: ToastrService
    ) {
    }

    ngOnInit(): void {
        this.controllerService.controllerControllerGetControllerPage().subscribe(res => {
            console.log('controllers ---', res);
            this.dataSource = new MatTableDataSource(res.controllers);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        })
    }

    edit(controller: ControllerResponse) {
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
                this.controllerService.controllerControllerGetControllerPage().subscribe(res => {
                    this.dataSource.disconnect();
                    this.dataSource = new MatTableDataSource(res.controllers);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                })
            }
        });
    }

    testController(id: number) {
        this.controllerService.controllerControllerTestController(id).subscribe(res => {
            this.toastr.success('Controller Testing ');
        })
    }

}
