import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from 'src/app/api_codegen';
import { CreateCompanyDto } from '../../../../api_codegen/model/createCompanyDto';

@Component({
  selector: 'app-add-organization-modal',
  templateUrl: './add-organization-modal.component.html',
  styleUrls: ['./add-organization-modal.component.scss']
})
export class AddOrganizationModalComponent implements OnInit {

    companyForm!: FormGroup;

    constructor(
        private dialogRef: MatDialogRef<AddOrganizationModalComponent>,
        private fb: FormBuilder,
        private toastr: ToastrService,
        private companyService: CompanyService
    ) { }

    ngOnInit(): void {
        this.companyForm = this.fb.group({
            name: ['', Validators.required],
            address: ['', Validators.required],
            city: ['', Validators.required],
            postalCode: ['', Validators.required],
            country: ['', Validators.required],
        });
    }

    cancel() {
        this.dialogRef.close(false);
    }

    save() {
        const body: CreateCompanyDto = {
            name: this.companyForm.controls['name'].value,
            address: this.companyForm.controls['address'].value,
            city: this.companyForm.controls['city'].value,
            postalCode: this.companyForm.controls['postalCode'].value,
            country: this.companyForm.controls['country'].value,
        }
        this.companyService.companyControllerCreateCompany(body).subscribe(res => {
            console.log('new Organization - wow', res)
            this.toastr.success('New Organization Created')
            this.dialogRef.close(res);
        })
    }

}
