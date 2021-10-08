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

import { ManagementRoutingModule } from './management-routing.module';
import { DirectivesModule } from '@app-shared/directives/directives.module';
import { ConfirmService } from '@app-core/services/confirm.service';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { InviteUserComponent } from './components/invite-user/invite-user.component';
import { ManagementComponent } from './management.component';
import { MatTabsModule } from '@angular/material/tabs';
import { UserManageComponent } from './tabs/user-manage/user-manage.component';
import { OrganizationManageComponent } from './tabs/organization-manage/organization-manage.component';
import { PipesModule } from '../../shared/pipes/pipes.module';
import { OrganizationDetailComponent } from './components/organization-detail/organization-detail.component';
import { OrganizationEditComponent } from './components/organization-edit/organization-edit.component';
import { AddOrganizationModalComponent } from './components/add-organization-modal/add-organization-modal.component';
import { DepartmentsTableComponent } from './components/departments-table/departments-table.component';
import { AddDepartmentModalComponent } from './components/add-department-modal/add-department-modal.component';
import { DepartmentEditPanelComponent } from './components/department-edit-panel/department-edit-panel.component';



@NgModule({
    declarations: [
        InviteUserComponent,
        ManagementComponent,
        UserManageComponent,
        OrganizationManageComponent,
        OrganizationDetailComponent,
        OrganizationEditComponent,
        AddOrganizationModalComponent,
        DepartmentsTableComponent,
        AddDepartmentModalComponent,
        DepartmentEditPanelComponent
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
        MatTableModule,
        MatTabsModule,
        MatSelectModule,
        PipesModule
    ],
    providers: [
        ConfirmService,
        NgDialogAnimationService
    ]
})
export class ManagementModule { }
