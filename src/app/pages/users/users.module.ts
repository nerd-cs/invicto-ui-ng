import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';

import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgDialogAnimationService } from 'ng-dialog-animation';

import { DirectivesModule } from '@app-shared/directives/directives.module';
import { ComponentsModule } from '@app-shared/components/components.module';
import { ConfirmService } from '@app-core/services/confirm.service';
import { PipesModule } from '@app-shared/pipes/pipes.module';

import { AllUsersComponent } from './all-users/all-users.component';
import { AdminsComponent } from './admins/admins.component';
import { UsersRoutingModule } from './users-routing.module';
import { QuickViewComponent } from './all-users/quick-view/quick-view.component';
import { UserDetailComponent } from './all-users/user-detail/user-detail.component';
import { TierAdminsComponent } from './tier-admins/tier-admins.component';
import { FiltersPanelComponent } from './all-users/filters-panel/filters-panel.component';
import { ProfileEditComponent } from './all-users/user-detail/components/profile-edit/profile-edit.component';
import { CardsTableComponent } from './all-users/user-detail/components/cards-table/cards-table.component';
import { AccessGroupsTableComponent } from './all-users/user-detail/components/access-groups-table/access-groups-table.component';
import { ActivitiesTableComponent } from './all-users/user-detail/components/activities-table/activities-table.component';
import { EditGroupPanelComponent } from './all-users/user-detail/components/edit-group-panel/edit-group-panel.component';
import { CardEditComponent } from './all-users/user-detail/components/card-edit/card-edit.component';
import { SpinnerModule } from '@app-layouts/spinner/spinner.module';

@NgModule({
    declarations: [
        AllUsersComponent,
        AdminsComponent,
        QuickViewComponent,
        UserDetailComponent,
        TierAdminsComponent,
        FiltersPanelComponent,
        ProfileEditComponent,
        CardsTableComponent,
        AccessGroupsTableComponent,
        ActivitiesTableComponent,
        EditGroupPanelComponent,
        CardEditComponent
    ],
    imports: [
        CommonModule,
        UsersRoutingModule,
        DirectivesModule,
        FormsModule,
        PipesModule,
        SpinnerModule,
        ReactiveFormsModule,
        ComponentsModule,
        MatFormFieldModule,
        MatSlideToggleModule,
        MatCheckboxModule,
        MatIconModule,
        MatDialogModule,
        MatMenuModule,
        MatSelectModule,
        MatInputModule,
        MatChipsModule,
        MatTableModule,
        MatSortModule,
        MatDatepickerModule,
        MatSnackBarModule,
        MatPaginatorModule,
        NgxMaskModule.forChild()
    ],
    providers: [
        NgDialogAnimationService,
        ConfirmService
    ]
})
export class UsersModule { }
