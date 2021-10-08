import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { AccountRoutingModule } from './account-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { AccountEditPanelComponent } from './panels/account-edit-panel/account-edit-panel.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmService } from '@app-core/services/confirm.service';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SpinnerModule } from '@app-layouts/spinner/spinner.module';
import { PasswordEditPanelComponent } from './panels/password-edit-panel/password-edit-panel.component';
import { PhoneEditPanelComponent } from './panels/phone-edit-panel/phone-edit-panel.component';
import { NgxMaskModule } from 'ngx-mask';
import { TwoStepPanelComponent } from './panels/two-step-panel/two-step-panel.component';
import { CommunicationEditPanelComponent } from './panels/communication-edit-panel/communication-edit-panel.component';
import { SettingEditPanelComponent } from './panels/setting-edit-panel/setting-edit-panel.component';
import { PipesModule } from '../../shared/pipes/pipes.module';

@NgModule({
    declarations: [
        AccountComponent,
        AccountEditPanelComponent,
        PasswordEditPanelComponent,
        PhoneEditPanelComponent,
        TwoStepPanelComponent,
        CommunicationEditPanelComponent,
        SettingEditPanelComponent
    ],
    imports: [
        CommonModule,
        AccountRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatSelectModule,
        MatInputModule,
        MatDialogModule,
        MatSnackBarModule,
        SpinnerModule,
        PipesModule,
        NgxMaskModule.forRoot()
    ],
    providers: [
        NgDialogAnimationService,
        ConfirmService
    ]
})
export class AccountModule { }
