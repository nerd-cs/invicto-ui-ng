import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';

import { NgxWebstorageModule } from 'ngx-webstorage';
import { environment } from 'src/environments/environment';
import { DirectivesModule } from '@app-shared/directives/directives.module';
import { LayoutsModule } from '@app-layouts/layouts.module';

import { EmailSentComponent } from './email-sent/email-sent.component';
import { SigninComponent } from './signin.component';
import { SigninRoutingModule } from './signin-routing.module';
import { LostPasswordComponent } from './lost-password/lost-password.component';
import { TwoFaComponent } from './two-fa/two-fa.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';



@NgModule({
    declarations: [
        SigninComponent,
        LostPasswordComponent,
        TwoFaComponent,
        EmailSentComponent,
        ResetPasswordComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        DirectivesModule,
        SigninRoutingModule,
        LayoutsModule,
        FormsModule,
        ReactiveFormsModule,
        SocialLoginModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatIconModule,
        MatCheckboxModule,
        TranslateModule
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
export class SigninModule { }
