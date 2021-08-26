import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app-core/services/authentication.service';
import { LocalStorageService } from 'ngx-webstorage';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-two-fa',
    templateUrl: './two-fa.component.html',
    styleUrls: ['./two-fa.component.scss']
})
export class TwoFaComponent implements OnInit {

    twoFAForm: FormGroup = new FormGroup({});

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authService: AuthenticationService,
        private storage: LocalStorageService
    ) { }

    ngOnInit(): void {
        this.twoFAForm = this.fb.group({
            code: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
            remember: [true]
        })
    }

    send() {
        this.storage.store(environment.webStorage.auth, true);
        this.router.navigate(['']);
    }

    resendCode() {
        console.log('resend code');
    }

}
