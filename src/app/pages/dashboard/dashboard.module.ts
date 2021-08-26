import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';

import { NgApexchartsModule } from 'ng-apexcharts';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ComponentsModule } from '@app-shared/components/components.module';
import { ConfirmService } from '@app-core/services/confirm.service';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { UserGraphComponent } from './user-graph/user-graph.component';
import { UserActivitiesComponent } from './user-activities/user-activities.component';

@NgModule({
    declarations: [
        DashboardComponent,
        UserGraphComponent,
        UserActivitiesComponent
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        ComponentsModule,
        NgApexchartsModule,
        MatIconModule,
        MatDialogModule,
        MatSnackBarModule,
        MatTableModule,
        MatSelectModule,
        MatSortModule,
        NgCircleProgressModule.forRoot()
    ],
    providers: [
        ConfirmService,
        NgDialogAnimationService
    ]
})
export class DashboardModule { }
