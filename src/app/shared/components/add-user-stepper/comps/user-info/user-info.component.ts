import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Company, CompanyService } from 'src/app/api_codegen';

@Component({
    selector: 'app-user-info',
    templateUrl: './user-info.component.html',
    styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

    @Input() userInfoData: any;
    @Output() stepUpdate: EventEmitter<number> = new EventEmitter<number>();
    @Output() cancel: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() userInfo: EventEmitter<any> = new EventEmitter<any>();

    userInfoForm!: FormGroup;
    companyList: Company[] = [];

    constructor(
        private fb: FormBuilder,
        private companyService: CompanyService,
    ) {
        this.companyService.companyControllerGetAllCompanies().subscribe(res => {
            this.companyList = res;
            console.log(this.companyList, 'Hey -Companies----')
        })
    }

    ngOnInit(): void {
        this.userInfoForm = this.fb.group({
            name: [this.userInfoData.name, Validators.required],
            email: [this.userInfoData.email, [Validators.required, Validators.email]],
            phone: [this.userInfoData.phone, Validators.required],
            company: [this.userInfoData.company, Validators.required],
            role: [this.userInfoData.role],
            sso: [this.userInfoData.sso]
        })
    }

    objectCompareWith(o1: any, o2: any) { return o1.id === o2.id};

    next() {
        this.stepUpdate.emit(2);
        this.userInfo.emit(this.userInfoForm);
    }
    close() {
        this.cancel.emit(true);
    }

    get emailInValidMessage() {
        if (this.userInfoForm.controls['email'].hasError('required') || this.userInfoForm.controls['phone'].hasError('required')) {
            return 'You must enter a value';
        }
        return this.userInfoForm.controls['email'].hasError('email') ? 'Not a valid email' : '';
    }

}
