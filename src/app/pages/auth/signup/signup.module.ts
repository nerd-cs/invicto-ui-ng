import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { SignupComponent } from './signup.component';
import { SecurityPhoneComponent } from './security-phone/security-phone.component';
import { SignupRoutingModule } from './signup-routing.module';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { MatSelectModule } from '@angular/material/select';
import { environment } from 'src/environments/environment';
import { TranslateModule } from '@ngx-translate/core';

const options: Partial<IConfig> | (() => Partial<IConfig>) = {};

@NgModule({
    declarations: [
        SignupComponent,
        SecurityPhoneComponent
    ],
    imports: [
        CommonModule,
        SignupRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatCheckboxModule,
        MatSelectModule,
        SocialLoginModule,
        TranslateModule,
        NgxMaskModule.forRoot(options)
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
export class SignupModule { }
