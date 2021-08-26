import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppValidators } from '@app-core/utils/app-validators';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'ngx-webstorage';
import { relative } from 'path';
import { of, Subject } from 'rxjs';
import { catchError, switchMap, takeUntil } from 'rxjs/operators';
import { AuthLoginBody, AuthService, CompleteRegistrationDto, UsersService } from 'src/app/api_codegen';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

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
        private usersService: UsersService,
        private authService: AuthService
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

    async googleSignIn() {
        await this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
        this.socialAuthService.authState
            .pipe(takeUntil(this.destroy$))
            .subscribe((user) => {
                this.socialUser = user;
                if (user) {
                    this.storage.store(environment.webStorage.auth, true);
                    this.router.navigate(['']);
                    this.toastr.info(this.socialUser.name + `(` + this.socialUser.email + `)` + ` signed`);
                } else {
                }
            });
    }

    termsService() {

    }
    privacyPolicy() {

    }

    signUp() {
        const reg: CompleteRegistrationDto = {
            token: this.token,
            password: this.signupForm.controls['confirm'].value
        }
        console.log(reg, '====');
        this.usersService.usersControllerCompleteRegistration(reg).pipe(
            switchMap(res => {
                console.log('res - confirm reg', res);
                const body: AuthLoginBody = {
                    email: res.email,
                    password: this.signupForm.controls['confirm'].value
                }
                this.storage.clear();
                return this.authService.authControllerLogin(body).pipe(
                    catchError(err => { throw err; })
                )
            })
        ).subscribe(response => {
            console.log('=== User Info ===', response);
            this.storage.store(environment.webStorage.auth, true);
            this.storage.store(environment.webStorage.user, response);
            this.router.navigate(['']);
        }, (err) => {
            console.log('err-signUp', err);
            this.toastr.error(err.error.message || 'Error');
            this.storage.clear();
            this.router.navigate(['login'])
        })
    }
}


