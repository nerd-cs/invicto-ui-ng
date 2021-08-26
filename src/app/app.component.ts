import { Component, OnDestroy } from '@angular/core';
import { I18nService } from '@app-core/services/i18n.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
    constructor(
        private i18nService: I18nService
    ) {
        i18nService.init(environment.defaultLanguage, environment.supportedLanguages)
    }

    ngOnDestroy(): void {
        this.i18nService.destroy();
    }
}
