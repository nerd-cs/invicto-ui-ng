import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSortModule } from '@angular/material/sort';

import { NgDialogAnimationService } from 'ng-dialog-animation';
import { ConfirmService } from '@app-core/services/confirm.service';
import { DirectivesModule } from '@app-shared/directives/directives.module';
import { ActivitiesFilterPanelComponent } from './activities-filter-panel/activities-filter-panel.component';
import { ActivitiesComponent } from './activities.component';
import { ActivitiesRoutingModule } from './activities-routing.module';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { PipesModule } from '../../shared/pipes/pipes.module';



@NgModule({
    declarations: [
        ActivitiesComponent,
        ActivitiesFilterPanelComponent
    ],
    imports: [
        CommonModule,
        ActivitiesRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        DirectivesModule,
        PipesModule,
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
        ConfirmService, NgDialogAnimationService
    ]
})
export class ActivitiesModule { }
