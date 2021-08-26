import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-user-info',
    templateUrl: './user-info.component.html',
    styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

    @Input() role: string = 'Member';
    @Output() stepUpdate: EventEmitter<number> = new EventEmitter<number>();
    @Output() cancel: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() userInfo: EventEmitter<any> = new EventEmitter<any>();

    userInfoForm!: FormGroup;

    constructor(
        private fb: FormBuilder
    ) { }

    ngOnInit(): void {
        this.userInfoForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', Validators.required],
            role: [this.role],
            sso: [true]
        })
    }

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
