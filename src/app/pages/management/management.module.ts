import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { UserManagementComponent } from './user-management/user-management.component';
import { ManagementRoutingModule } from './management-routing.module';
import { DirectivesModule } from '@app-shared/directives/directives.module';
import { ConfirmService } from '@app-core/services/confirm.service';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { InviteUserComponent } from './components/invite-user/invite-user.component';



@NgModule({
    declarations: [
        UserManagementComponent,
        InviteUserComponent
    ],
    imports: [
        CommonModule,
        ManagementRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        DirectivesModule,
        MatIconModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatInputModule,
        MatMenuModule,
        MatSnackBarModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatDialogModule,
        MatSelectModule
    ],
    providers: [
        ConfirmService,
        NgDialogAnimationService
    ]
})
export class ManagementModule { }
