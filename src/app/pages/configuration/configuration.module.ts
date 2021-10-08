import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgDialogAnimationService } from 'ng-dialog-animation';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';

import { DirectivesModule } from '@app-shared/directives/directives.module';
import { ConfigurationComponent } from './configuration.component';
import { ConfigurationRoutingModule } from './configuration-routing.module';
import { ConfigurationControllersComponent } from './tabs/configuration-controllers/configuration-controllers.component';
import { ConfigurationDoorsComponent } from './tabs/configuration-doors/configuration-doors.component';
import { ConfigurationFiltersComponent } from './panels/configuration-filters/configuration-filters.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ConfControllerEditComponent } from './panels/conf-controller-edit/conf-controller-edit.component';
import { ConfDoorEditComponent } from './panels/conf-door-edit/conf-door-edit.component';
import { ConfirmService } from '@app-core/services/confirm.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
    declarations: [
        ConfigurationComponent,
        ConfigurationControllersComponent,
        ConfigurationDoorsComponent,
        ConfigurationFiltersComponent,
        ConfControllerEditComponent,
        ConfDoorEditComponent
    ],
    imports: [
        CommonModule,
        ConfigurationRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatIconModule,
        MatTabsModule,
        MatMenuModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatDialogModule,
        MatSnackBarModule,
        MatSlideToggleModule,
        MatDatepickerModule,
        DirectivesModule
    ],
    providers: [
        NgDialogAnimationService,
        ConfirmService
    ]
})
export class ConfigurationModule { }
