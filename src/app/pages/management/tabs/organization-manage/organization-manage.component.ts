import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmService } from '@app-core/services/confirm.service';
import { GlobalShareService } from '@app-core/services/global-share.service';

import moment from 'moment';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';
import { Company, CompanyService, CreateCollaboratorDto } from 'src/app/api_codegen';
import { AddOrganizationModalComponent } from '../../components/add-organization-modal/add-organization-modal.component';

@Component({
    selector: 'app-organization-manage',
    templateUrl: './organization-manage.component.html',
    styleUrls: ['./organization-manage.component.scss']
})
export class OrganizationManageComponent implements OnInit {

    isLoading = false;
    private destroy$ = new Subject();
    sidenavCollapsed!: boolean;

    displayedColumns: string[] = ['company', 'createdAt', 'address', 'members', 'actions'];
    dataSource: MatTableDataSource<Company> = new MatTableDataSource();
    totalCompanies: number = 0;
    today = new Date();

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private dialog: NgDialogAnimationService,
        private confirmService: ConfirmService,
        private shareService: GlobalShareService,
        private companyService: CompanyService,
        private toastr: ToastrService
    ) { }

    ngOnInit(): void {
        this.shareService.sidenavCollapsed$.pipe(takeUntil(this.destroy$)).subscribe(res => {
            this.sidenavCollapsed = res;
        });

        this.getOrganizations();

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

    ngAfterViewInit() { }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    openFilters() {
    }

    getOrganizations() {
        this.isLoading = true;
        this.companyService.companyControllerGetAllCompanies().subscribe(res => {
            console.log('company ---', res);
            // this.totalCompanies = res.total;
            this.dataSource = new MatTableDataSource(res);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.isLoading = false;
        }, err => {
            this.toastr.error('Fetching company data failed')
            this.isLoading = false;
        })
    }

    async gotoCompanyDetail(element: any) {
        const id = element.id;
        const companyData = await this.companyService.companyControllerGetCompanyDescription(element.id).toPromise()
        this.router.navigate(['company-detail'], { queryParams: { id: id }, relativeTo: this.route, state: companyData });
    }

    addOrganization() {
        this.dialog.open(AddOrganizationModalComponent, {
            disableClose: false,
            panelClass: 'organization-panel',
        }).afterClosed().subscribe(res => {
            if (res) {
                this.confirmService.openSnackBar('New Organization added ! 🎉🎉🎉');
                this.getOrganizations();
            }
        })
    }

    deleteCompany(id: number) {
        this.companyService.companyControllerDeleteCompany(id).subscribe(res => {
            this.toastr.info('Company Deleted');
            this.getOrganizations();
        })
    }
}
