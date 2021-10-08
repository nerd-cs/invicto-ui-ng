import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AddDepartmentsDto, CompanyService } from 'src/app/api_codegen';

@Component({
    selector: 'app-add-department-modal',
    templateUrl: './add-department-modal.component.html',
    styleUrls: ['./add-department-modal.component.scss']
})
export class AddDepartmentModalComponent implements OnInit {

    departmentForm: FormGroup = new FormGroup({});
    departmentItems: FormArray = new FormArray([]);
    companyId: any;

    constructor(
        private dialogRef: MatDialogRef<AddDepartmentModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder,
        private toastr: ToastrService,
        private companyService: CompanyService
    ) {
        this.companyId = this.data.companyId
    }

    ngOnInit(): void {
        this.departmentForm = this.fb.group({
            costCenter: ['', Validators.required],
            departmentItems: this.fb.array([
                this.fb.group({ name: ['', Validators.required] })
            ])
        });
    }

    createItem() {
        return this.fb.group({
            name: ['', Validators.required]
        })
    }
    addItem() {
        this.departmentItems = this.departmentForm.get('departmentItems') as FormArray;
        this.departmentItems.push(this.createItem());
    }
    removeItem(idx: number) {
        this.departmentItems = this.departmentForm.get('departmentItems') as FormArray;
        this.departmentItems.removeAt(idx);
    }

    get departmentArray() {
        return (this.departmentForm.get('departmentItems') as FormArray).controls;
    }

    cancel() {
        this.dialogRef.close(false);
    }

    save() {
        let departments: any[] = [];
        this.departmentForm.controls['departmentItems'].value.forEach((element: any) => {
            departments.push({ name: element.name });
        });
        const body: AddDepartmentsDto = {
            costCenter: {
                name: this.departmentForm.controls['costCenter'].value,
            },
            departments: departments
        }
        this.companyService.companyControllerCreateDepartments(body, this.companyId).subscribe(res => {
            console.log('new Organization - wow', res)
            this.toastr.success('New Organization Created')
            this.dialogRef.close(res);
        })
    }

}
