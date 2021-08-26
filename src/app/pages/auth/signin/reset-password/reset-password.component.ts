import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AppValidators } from '@app-core/utils/app-validators';
import { SocialUser, SocialAuthService, GoogleLoginProvider } from 'angularx-social-login';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'ngx-webstorage';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UsersService, CompleteRegistrationDto } from 'src/app/api_codegen';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

    hide = true;
    destroy$ = new Subject();

    signupForm: FormGroup = new FormGroup({});
    socialUser!: SocialUser;
    token!: string;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private socialAuthService: SocialAuthService,
        private storage: LocalStorageService,
        private toastr: ToastrService,
        private usersService: UsersService
    ) {
        this.route.queryParams
            .subscribe(params => {
                if (params.token) {
                    this.token = params.token
                }
            })
    }

    ngOnInit() {
        this.signupForm = this.fb.group({
            password: ['', [
                Validators.required,
                Validators.minLength(8),
                AppValidators.patternValidator(/[0-9]/, { hasNumber: true }),
                AppValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
                AppValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
                AppValidators.patternValidator(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/, { hasSpecialCharacters: true })
            ]],
            confirm: ['', [Validators.required]]
        }, { validators: AppValidators.passwordMatchValidator() })
    }

    signUp() {
        const reg: CompleteRegistrationDto = {
            token: this.token,
            password: this.signupForm.controls['confirm'].value
        }
        this.usersService.usersControllerConfirmPassword(reg).subscribe(res => {
            console.log('res - confirm reg', res);
            this.storage.clear();
            this.router.navigate(['login']);
        })
        return;
    }
}
