import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { environment } from 'src/environments/environment';
import { TranslateModule } from '@ngx-translate/core';

import { SigninStepComponent } from './signin-step/signin-step.component';
import { AccountModalComponent } from './account-modal/account-modal.component';


@NgModule({
    declarations: [SigninStepComponent, AccountModalComponent],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        SocialLoginModule,
        TranslateModule
    ],
    exports: [
        SigninStepComponent
    ],
    providers: [
        {
            provide: 'SocialAuthServiceConfig',
            useValue: {
                autoLogin: false,
                providers: [
                    {
                        id: GoogleLoginProvider.PROVIDER_ID,
                        provider: new GoogleLoginProvider(environment.googleLoginClientId)
                    }
                ]
            } as SocialAuthServiceConfig,
        }
    ],
})
export class LayoutsModule { }
