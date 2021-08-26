import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgDialogAnimationService } from 'ng-dialog-animation';

import { GlobalShareService } from '@app-core/services/global-share.service';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Json2CsvService } from '@app-core/services/json-to-csv.service';
import { ConfirmService } from '@app-core/services/confirm.service';


export type AccessTypes = 'Granted' | 'Denied';
export interface ActivitiesData {
    id: string;
    door: string;
    lastActivity: Date | string;
    accessGroups: string;
    zone: string;
    access: AccessTypes;
};

@Component({
  selector: 'app-activities-table',
  templateUrl: './activities-table.component.html',
  styleUrls: ['./activities-table.component.scss']
})
export class ActivitiesTableComponent implements OnInit, AfterViewInit {

    displayedColumns: string[] = ['door', 'lastActivity', 'activitiesAccessGroups', 'activitiesZone', 'status', 'actions'];
    dataSource: MatTableDataSource<ActivitiesData>;
    @Output() data: EventEmitter<ActivitiesData[]> = new EventEmitter<ActivitiesData[]>();

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    activitiesDataRes: ActivitiesData[] = [
        {
            id: '0',
            door: 'Main Entrance',
            lastActivity: moment(new Date()).format('MM-DD-YYYY [at] hh:mm a'),
            accessGroups: 'General',
            zone: '1 st floor',
            access: 'Granted'
        },
        {
            id: '1',
            door: 'Suite 302',
            lastActivity: moment(new Date()).format('MM-DD-YYYY [at] hh:mm a'),
            accessGroups: 'Employee',
            zone: '3 rd floor',
            access: 'Denied'
        }
    ];
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private dialog: NgDialogAnimationService,
        private shareService: GlobalShareService,
        private toastr: ToastrService,
        private json2csvService: Json2CsvService,
        private confirmService: ConfirmService
    ) {
        this.dataSource = new MatTableDataSource(this.activitiesDataRes);
    }

    ngOnInit(): void {
        this.data.emit(this.activitiesDataRes);
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    viewActivities(element: ActivitiesData) {

    }

    export(element: ActivitiesData) {
        this.confirmService.confirm('Download CSV', 'YES').afterClosed().subscribe(res => {
            if (res) {
                const name = 'Activity' + moment(new Date()).format('MM-DD-YY');
                this.json2csvService.downloadFile(element, name);
                this.confirmService.openSnackBar('Export Activity 🎉');
            }
        })
    }

}
