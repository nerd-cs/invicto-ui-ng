import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app-core/services/authentication.service';
import { LocalStorageService } from 'ngx-webstorage';
import { AuthService, User } from 'src/app/api_codegen';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-account-modal',
    templateUrl: './account-modal.component.html',
    styleUrls: ['./account-modal.component.scss']
})
export class AccountModalComponent implements OnInit {

    company: string;
    user: User;

    constructor(
        private router: Router,
        private dialogRef: MatDialogRef<AccountModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private storage: LocalStorageService,
        private authService: AuthenticationService,
        private apiAuthService: AuthService
    ) {
        this.user = this.authService.loggedInUser;
        this.company = this.user.company.name;
    }

    ngOnInit() { }

    cancel(): void {
        this.dialogRef.close(null);
    }

    signOut() {
        this.dialogRef.close();
        this.apiAuthService.authControllerLogout().subscribe(res => {
            console.log('auth logout---', res);
        })
        this.storage.clear();
        this.router.navigate(['login']);
    }

    viewAccount() {
        this.dialogRef.close();
        this.router.navigate(['account']);
    }

}
