import { Component, OnInit } from '@angular/core';
import { I18nService } from '@app-core/services/i18n.service';

@Component({
    selector: 'app-signin-step',
    templateUrl: './signin-step.component.html',
    styleUrls: ['./signin-step.component.scss']
})
export class SigninStepComponent implements OnInit {

    selected: string;

    constructor(
        public i18nService: I18nService
    ) {
        this.selected = this.i18nService.language === i18nService.frCA ? 'Français' : 'English';
    }

    ngOnInit(): void {
    }

    setLanguage(lang: string) {
        this.i18nService.language = lang;
    }
}
