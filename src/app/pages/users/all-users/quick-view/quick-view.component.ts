import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateUserCardsDto, User, UsersService } from 'src/app/api_codegen';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-quick-view',
    templateUrl: './quick-view.component.html',
    styleUrls: ['./quick-view.component.scss']
})
export class QuickViewComponent implements OnInit {

    keyCardOn = true;
    mobileCardOn = false;
    userData!: any;
    prevUserCards: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private usersService: UsersService,
        private toastr: ToastrService,
        private dialogRef: MatDialogRef<QuickViewComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.userData = data.userData;
        this.prevUserCards = JSON.parse(JSON.stringify(data.userData.cards));
        console.log('quick view user data', this.userData);
    }

    ngOnInit(): void {
        return;
        // TODO: Test Post card
        const body: CreateUserCardsDto = {
            "cards": [
                {
                    "type": "KEY",
                    "activationDate": new Date("2021-08-25T06:01:10.082Z"),
                    "expirationDate": new Date("2021-08-30T06:01:10.082Z"),
                    "number": 123
                }
            ]
        }
        this.usersService.usersControllerCreateUserCards(body, this.userData.id).subscribe(res => {
            console.log(res, 'UserCard');
        })
    }

    editProfile() {
        this.dialogRef.close();
        const id = this.userData.id;
        this.router.navigate(['users', 'all-users', 'user-detail'], { queryParams: { id: id }, state: this.userData });
    }

    resetPassword(id: number) {
        this.usersService.usersControllerResetPasswordForUser(id).subscribe(res => {
            this.toastr.info('Password Reset Email Sent');
        })
    }

    save() {
        this.userData.cards.forEach((card: any, idx: number) => {
            if (card.isActive === this.prevUserCards[idx].isActive) {
                return;
            }
            const body = { isActive : card.isActive };
            this.usersService.usersControllerChangeCardActiveness(body, this.userData.id, card.id).subscribe(res => {
                this.toastr.info(`Card-${card.id} status is updated`);
            }, (err) => {
                throw err;
            })
        });
    }

}
