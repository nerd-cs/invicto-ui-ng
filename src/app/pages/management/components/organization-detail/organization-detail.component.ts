import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RightSideDlgAnimation } from '@app-core/models/common';
import { ConfirmService } from '@app-core/services/confirm.service';
import { GlobalShareService } from '@app-core/services/global-share.service';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CompanyService, DepartmentService } from 'src/app/api_codegen';
import { OrganizationEditComponent } from '../organization-edit/organization-edit.component';
import { AddDepartmentModalComponent } from '../add-department-modal/add-department-modal.component';

@Component({
  selector: 'app-organization-detail',
  templateUrl: './organization-detail.component.html',
  styleUrls: ['./organization-detail.component.scss']
})
export class OrganizationDetailComponent implements OnInit {

    private destroy$ = new Subject();
    sidenavCollapsed!: boolean;

    companyId!: number;
    companyData!: any;
    departments!: any[];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private shareService: GlobalShareService,
        private dialog: NgDialogAnimationService,
        private toastr: ToastrService,
        private confirmService: ConfirmService,
        private companyService: CompanyService,
        private departmentService: DepartmentService,
    ) {
        const navigation = this.router.getCurrentNavigation() as any;
        const initialData = navigation.extras.state;
        this.route.queryParams.subscribe(params => {
            console.log(params, 'query params ---', initialData);
            this.companyId = params.id
        })
        this.companyData = initialData;
        console.log('hey-company data', this.companyData)
    }

    async ngOnInit() {
        this.departments = await this.departmentService.departmentControllerGetAllForCompany(this.companyId).toPromise()

        // FIXME: Resolver;
        if (!this.companyData) {
            this.getCompanyData();
        }

        this.shareService.sidenavCollapsed$.pipe(takeUntil(this.destroy$)).subscribe((res) => {
            this.sidenavCollapsed = res;
        });
    }

    ngAfterViewInit() {
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    getCompanyData() {
        this.companyService.companyControllerGetCompanyDescription(this.companyId).subscribe(res => {
            console.log('company Data ---', res);
            this.companyData = res;
        })
    }

    gotoCompany() {
        this.router.navigate(['/management']);
    }

    async companyEdit() {
        this.dialog.open(OrganizationEditComponent, {
            disableClose: false,
            panelClass: 'right-side-panel',
            animation: RightSideDlgAnimation,
            position: {
                rowStart: '1',
            },
            data: {
                company: this.companyData
            }
        }).afterClosed().subscribe(res => {
            if (res) {
                this.getCompanyData();
            }
        });
    }

    addDepartment() {
        this.dialog.open(AddDepartmentModalComponent, {
            disableClose: false,
            panelClass: 'department-panel',
            data: {
                companyId: this.companyData.id
            }
        }).afterClosed().subscribe(res => {
            if (res) {
                this.departmentService.departmentControllerGetAllForCompany(this.companyId).subscribe(res => {
                    this.departments = res
                })
                this.confirmService.openSnackBar('New Department added ! 🎉🎉🎉');
            }
        })
    }

    updateDepartmentData(evt: any) {
        if (evt) {
            this.departmentService.departmentControllerGetAllForCompany(this.companyId).subscribe(res => {
                this.departments = res;
            })
        }
    }

}
