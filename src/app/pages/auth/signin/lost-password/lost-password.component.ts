import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { ResetPasswordDto, UsersService } from 'src/app/api_codegen';

@Component({
    selector: 'app-lost-password',
    templateUrl: './lost-password.component.html',
    styleUrls: ['./lost-password.component.scss']
})
export class LostPasswordComponent implements OnInit {

    email = new FormControl('', [Validators.required, Validators.email]);

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private storage: LocalStorageService,
        private usersService: UsersService
    ) { }

    ngOnInit(): void {
    }

    get emailInValidMessage() {
        if (this.email.hasError('required')) {
            return 'You must enter a value';
        }
        return this.email.hasError('email') ? 'Not a valid email' : '';
    }

    send() {
        const body: ResetPasswordDto = {
            email: this.email.value
        };
        this.storage.clear();
        this.usersService.usersControllerResetPassword(body).subscribe(res => {
            console.log(res, 'reset password api');
            this.router.navigate(['email-sent'], { state: this.email.value });
        })
    }

}
