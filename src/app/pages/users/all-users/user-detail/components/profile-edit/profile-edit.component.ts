import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FiltersPanelComponent } from '@app-pages/users/all-users/filters-panel/filters-panel.component';
import { ToastrService } from 'ngx-toastr';
import { Company, DepartmentResponse, DepartmentService, UpdateUserDto, UserInfo, UsersService } from 'src/app/api_codegen';

@Component({
    selector: 'app-profile-edit',
    templateUrl: './profile-edit.component.html',
    styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {

    profileForm!: FormGroup;
    userData!: UserInfo;
    companyList: Company[] = [];
    departmentList: DepartmentResponse[] = [];

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<ProfileEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private usersService: UsersService,
        private toastr: ToastrService,
        private departmentService: DepartmentService
    ) {
        this.userData = this.data.userData;
        this.companyList = this.data.companyList;
        this.departmentList = this.data.departmentList;
    }

    ngOnInit(): void {
        console.log('wow---- status', status)
        const phone = this.userData.phoneNumber.substring(2);
        this.profileForm = this.fb.group({
            name: [this.userData.fullName, Validators.required],
            email: [this.userData.email, [Validators.required, Validators.email]],
            status: [this.userData.status, Validators.required],
            role: [this.userData.roles[0], Validators.required],
            phone: [phone, Validators.required],
            company: [this.userData.company, Validators.required],
            employeeNum: [this.userData.employeeNumber, Validators.required],
            department: [this.userData.department, Validators.required],
            // FIXME:
            costCenter: ['Quebec Office', Validators.required]
        });
    }

    get emailInValidMessage() {
        if (this.profileForm.controls['email'].hasError('required') || this.profileForm.controls['phone'].hasError('required')) {
            return 'You must enter a value';
        }
        return this.profileForm.controls['email'].hasError('email') ? 'Not a valid email' : '';
    }

    // FIXME:
    objectCompareWith(o1: any, o2: any) { return o1.name === o2.name && o1.id === o2.id };

    resetPassword() {
        this.usersService.usersControllerResetPasswordForUser(this.userData.id).subscribe(res => {
            this.toastr.info('Password Reset Email Sent');
        })
    }

    updateUserData() {
        let body: UpdateUserDto = {
            id: this.userData.id,
            // profilePicture: '',
            fullName: this.profileForm.controls['name'].value,
            status: this.profileForm.controls['status'].value,
            role: this.profileForm.controls['role'].value,
            phoneNumber: `+1` + this.profileForm.controls['phone'].value,
            employeeNumber: this.profileForm.controls['employeeNum'].value,
            // FIXME:
            // departmentId: this.profileForm.controls['department'].value.id,
            companyId: this.profileForm.controls['company'].value.id,
        }

        if (this.profileForm.controls['department'].value && this.profileForm.controls['department'].value.id) {
            body.departmentId = this.profileForm.controls['department'].value.id
        }

        this.usersService.usersControllerUpdateUser(body).subscribe(res => {
            console.log('user updated', res);
            this.toastr.success('User Info Updated');
            this.dialogRef.close(true);
        })
    }

}
