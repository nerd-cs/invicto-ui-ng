import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { RightSideDlgAnimation } from '@app-core/models/common';
import { GlobalShareService } from '@app-core/services/global-share.service';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/api_codegen';
import { DepartmentEditPanelComponent } from '../department-edit-panel/department-edit-panel.component';

@Component({
    selector: 'app-departments-table',
    templateUrl: './departments-table.component.html',
    styleUrls: ['./departments-table.component.scss']
})
export class DepartmentsTableComponent implements OnInit {

    @Input() departments: any[] = [];
    @Input() companyId: any;
    @Output() departmentUpdated: EventEmitter<boolean> = new EventEmitter<boolean>();

    displayedColumns: string[] = ['department', 'createdAt', 'members', 'actions'];
    dataSource!: MatTableDataSource<any>;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private dialog: NgDialogAnimationService,
        private shareService: GlobalShareService,
        private usersService: UsersService,
        private toastr: ToastrService
    ) { }

    ngOnInit(): void {
        // console.log(this.cards, '=card=')
        this.dataSource = new MatTableDataSource(this.departments);
    }

    ngOnChanges(changes: SimpleChanges): void {
        const szDepartments = 'departments';
        // console.log('changes----', changes)
        if (changes.hasOwnProperty(szDepartments) && !changes[szDepartments].firstChange) {
            this.dataSource.disconnect();
            console.log('wow--------', this.departments)
            this.dataSource = new MatTableDataSource(this.departments);
        }
    }

    edit(department: any) {
        this.dialog.open(DepartmentEditPanelComponent, {
            disableClose: false,
            panelClass: 'right-side-panel',
            animation: RightSideDlgAnimation,
            position: {
                rowStart: '1',
            },
            data: {
                departments: this.departments,
                companyId: this.companyId
            }
        }).afterClosed().subscribe(res => {
            if (res) {
                this.departmentUpdated.emit(true);
            }
        });
    }

    delete(ele: any) {
        this.toastr.warning('TODO: remove api');
    }
}
