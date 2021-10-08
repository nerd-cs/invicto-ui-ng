import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompanyService, UpdateCompanyDto, UpdateDepartmentsDto } from 'src/app/api_codegen';
import { UpdateDepartmentDto } from '../../../../api_codegen/model/updateDepartmentDto';

@Component({
    selector: 'app-department-edit-panel',
    templateUrl: './department-edit-panel.component.html',
    styleUrls: ['./department-edit-panel.component.scss']
})
export class DepartmentEditPanelComponent implements OnInit {

    departmentForm!: FormArray;
    departmentData!: any;
    companyId!: any;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<DepartmentEditPanelComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private toastr: ToastrService,
        private companyService: CompanyService,
        private router: Router,
    ) {
        this.departmentData = this.data.departments;
        this.companyId = this.data.companyId;
    }

    ngOnInit(): void {
        let departmentItems: any[] = [];
        console.log(this.departmentData, 'wow------------')
        this.departmentData.forEach((element: any) => {
            departmentItems.push(this.fb.group({
                name: [element.name, Validators.required],
                id: [element.id]
            }));
        })
        this.departmentForm = this.fb.array(departmentItems);
        console.log(this.departmentForm, 'wow------------')
    }

    createItem() {
        return this.fb.group({
            name: ['', Validators.required],
        })
    }
    addItem() {
        this.departmentForm.push(this.createItem());
    }
    removeItem(idx: number) {
        this.departmentForm.removeAt(idx);
    }

    updateDepartment() {
        let body: UpdateDepartmentsDto = { departments: [] }

        this.departmentForm.value.forEach((res: any) => {
            body.departments.push({ id: res.id, name: res.name })
        });

        this.companyService.companyControllerUpdateDepartments(body, this.companyId).subscribe(res => {
            this.toastr.success('Department Info Updated');
            this.dialogRef.close(true);
        })
    }

}
