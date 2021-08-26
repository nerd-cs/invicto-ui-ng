import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'ngx-webstorage';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { AuthLoginBody, AuthService } from 'src/app/api_codegen';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit, OnDestroy {

    private destroy$ = new Subject();
    loginForm: FormGroup = new FormGroup({});
    hide = true;

    socialUser!: SocialUser;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private socialAuthService: SocialAuthService,
        private toastr: ToastrService,
        private storage: LocalStorageService,
        private authService: AuthService,
    ) { }

    ngOnInit(): void {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        })
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    login() {
        const body: AuthLoginBody = {
            email: this.loginForm.get('email')?.value,
            password: this.loginForm.get('password')?.value
        }
        this.authService.authControllerLogin(body).subscribe(res => {
            console.log('=== User Info ===', res);
            this.storage.store(environment.webStorage.user, res);
            this.router.navigate(['2fa']);
        }, error => {
            this.toastr.error(error.error.message || 'Error');
        })
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

    logOut(): void {
        this.socialAuthService.signOut(true).then().catch(err => console.log(err, 'Sign out error'));
    }

    resetPassword() {
        this.router.navigate(['password-reset']);
    }

    get emailInValidMessage() {
        if (this.loginForm.controls['email'].hasError('required')) {
            return 'You must enter a value';
        }
        return this.loginForm.controls['email'].hasError('email') ? 'Not a valid email' : '';
    }

}
