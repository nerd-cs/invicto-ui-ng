import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatRippleModule } from '@angular/material/core';

import { MainNavComponent } from './main-nav.component';
import { MainNavRoutingModule } from './main-nav-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { ConfirmService } from '@app-core/services/confirm.service';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { environment } from 'src/environments/environment';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
    declarations: [
        MainNavComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MainNavRoutingModule,
        MatIconModule,
        MatMenuModule,
        MatRippleModule,
        MatDialogModule,
        SocialLoginModule,
        TranslateModule
    ],
    providers: [
        NgDialogAnimationService,
        ConfirmService,
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
    ]
})
export class MainNavModule { }
