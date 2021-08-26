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
import { GoogleEditPanelComponent } from './panels/google-edit-panel/google-edit-panel.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';



@NgModule({
    declarations: [
        AccountComponent,
        AccountEditPanelComponent,
        GoogleEditPanelComponent
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
        MatSnackBarModule
    ],
    providers: [
        NgDialogAnimationService,
        ConfirmService
    ]
})
export class AccountModule { }
