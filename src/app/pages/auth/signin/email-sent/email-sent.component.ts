import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-email-sent',
    templateUrl: './email-sent.component.html',
    styleUrls: ['./email-sent.component.scss']
})
export class EmailSentComponent implements OnInit {

    email: string = '';

    constructor(
        private router: Router
    ) {
        const navigation = this.router.getCurrentNavigation() as any;
        this.email = navigation.extras.state;
    }

    ngOnInit(): void {
    }

}
