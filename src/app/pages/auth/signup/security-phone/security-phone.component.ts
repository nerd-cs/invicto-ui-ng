import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-security-phone',
    templateUrl: './security-phone.component.html',
    styleUrls: ['./security-phone.component.scss']
})
export class SecurityPhoneComponent implements OnInit {

    securityForm: FormGroup = new FormGroup({});

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.securityForm = this.fb.group({
            twoFA: [false],
            phone: ['2347894560', [Validators.required]],
        })
    }

    submit() {
        this.router.navigate(['signup', 'confirm-code']);
    }

}
