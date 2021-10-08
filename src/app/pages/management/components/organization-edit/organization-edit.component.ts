import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProfileEditComponent } from '@app-pages/users/all-users/user-detail/components/profile-edit/profile-edit.component';
import { ToastrService } from 'ngx-toastr';
import { CompanyService, UpdateCompanyDto } from 'src/app/api_codegen';

@Component({
    selector: 'app-organization-edit',
    templateUrl: './organization-edit.component.html',
    styleUrls: ['./organization-edit.component.scss']
})
export class OrganizationEditComponent implements OnInit {

    companyForm!: FormGroup;
    companyData!: any;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<OrganizationEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private toastr: ToastrService,
        private companyService: CompanyService,
        private router: Router,
    ) {
        this.companyData = this.data.company;
    }

    ngOnInit(): void {
        this.companyForm = this.fb.group({
            name: [this.companyData.name, Validators.required],
            address: [this.companyData.address, Validators.required],
            city: [this.companyData.city, Validators.required],
            postalCode: [this.companyData.postalCode, Validators.required],
            country: [this.companyData.country, Validators.required],
        });
    }

    updateCompany() {
        let body: UpdateCompanyDto = {
            id: this.companyData.id,
            name: this.companyForm.controls['name'].value,
            address: this.companyForm.controls['address'].value,
            city: this.companyForm.controls['city'].value,
            postalCode: this.companyForm.controls['postalCode'].value,
            country: this.companyForm.controls['country'].value,
        }

        this.companyService.companyControllerUpdateCompany(body).subscribe(res => {
            console.log('Organization updated', res);
            this.toastr.success('Organization Info Updated');
            this.dialogRef.close(true);
        })
    }

    delete() {
        this.companyService.companyControllerDeleteCompany(this.companyData.id).subscribe(res => {
            this.toastr.info('Company Deleted');
            this.dialogRef.close();
            this.router.navigate(['/management'])
        })
    }

}
