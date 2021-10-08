import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgDialogAnimationService } from 'ng-dialog-animation';

import { GlobalShareService } from '@app-core/services/global-share.service';
import moment from 'moment';
import { EditGroupPanelComponent } from '../edit-group-panel/edit-group-panel.component';
import { RightSideDlgAnimation } from '@app-core/models/common';
import { ChangeActivenessDto, UpdateAccessGroupDto, UsersService, ZoneService } from 'src/app/api_codegen';
import { ToastrService } from 'ngx-toastr';
import { AccessGroupPanelComponent } from '@app-pages/control-access/panels/access-group-panel/access-group-panel.component';

@Component({
    selector: 'app-access-groups-table',
    templateUrl: './access-groups-table.component.html',
    styleUrls: ['./access-groups-table.component.scss']
})
export class AccessGroupsTableComponent implements OnInit, AfterViewInit {

    @Input() accessGroups: any[] = [];
    @Input() userId: number = 0;
    @Input() scheduleList: any[] = [];
    @Output() groupUpdated: EventEmitter<boolean> = new EventEmitter<boolean>();

    displayedColumns: string[] = ['location', 'lastActivity', 'zone', 'status', 'actions'];
    dataSource!: MatTableDataSource<any>;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private dialog: NgDialogAnimationService,
        private shareService: GlobalShareService,
        private usersService: UsersService,
        private toastr: ToastrService,
        private zoneService: ZoneService
    ) { }

    ngOnInit(): void {
        console.log(this.accessGroups, '=accessGroups=')
        this.dataSource = new MatTableDataSource(this.accessGroups);
    }

    ngOnChanges(changes: SimpleChanges): void {
        const szAccess = 'accessGroups';
        const szSchedule = 'scheduleList';
        if (changes.hasOwnProperty(szAccess) && !changes[szAccess].firstChange) {
            this.dataSource.disconnect();
            this.dataSource = new MatTableDataSource(this.accessGroups);
        }
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    editGroup(element: any) {
        this.dialog.open(EditGroupPanelComponent, {
            disableClose: false,
            panelClass: 'right-side-panel',
            animation: RightSideDlgAnimation,
            position: {
                rowStart: '1',
            },
            data: {
                element: element,
                userId: this.userId
            }
        }).afterClosed().subscribe(res => {
            if (res) {
                this.groupUpdated.emit(true);
            }
        });
    }

    // TODO: FIXME: element is different from control access edit mode - no zoneSchedules
    // async editGroup(element: any) {
    //     console.log(element, 'hey--element')
    //     return
    //     const zones = await this.zoneService.zoneControllerGetAllForLocation(element.location.id).toPromise();
    //     this.dialog.open(AccessGroupPanelComponent, {
    //         disableClose: false,
    //         panelClass: 'right-side-panel',
    //         animation: RightSideDlgAnimation,
    //         position: {
    //             rowStart: '1',
    //         },
    //         data: {
    //             accessGroup: element,
    //             schedules: this.scheduleList,
    //             zones: zones
    //         }
    //     }).afterClosed().subscribe(res => {
    //         if (res) {
    //             this.groupUpdated.emit(true);
    //         }
    //     });
    // }

    inactiveAccessGroup(group: any) {
        const body: ChangeActivenessDto = {
            isActive: false
        }
        this.usersService.usersControllerChangeAccessGroupActiveness(body, this.userId, group.id).subscribe(res => {
            this.toastr.success('Access Group Status InActive');
            this.groupUpdated.emit(true);
        })
    }
    removeAccessGroup(group: any) {
        this.usersService.usersControllerUnlinkUserAccessGroup(this.userId, group.id).subscribe(res => {
            this.toastr.success('Access Group Deleted');
            this.groupUpdated.emit(true);
        })
    }
}
