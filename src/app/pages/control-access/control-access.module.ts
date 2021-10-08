import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { NgDialogAnimationService } from 'ng-dialog-animation';

import { PipesModule } from '@app-shared/pipes/pipes.module';
import { DirectivesModule } from '@app-shared/directives/directives.module';
import { ConfirmService } from '@app-core/services/confirm.service';
import { ComponentsModule } from '@app-shared/components/components.module';

import { ControlAccessRoutingModule } from './control-access-routing.module';
import { ControlAccessComponent } from './control-access.component';
import { ControlAccessGroupsComponent } from './tabs/control-access-groups/control-access-groups.component';
import { ControlSchedulesComponent } from './tabs/control-schedules/control-schedules.component';
import { ControlZonesComponent } from './tabs/control-zones/control-zones.component';
import { ControlHolidaysComponent } from './tabs/control-holidays/control-holidays.component';
import { AddScheduleModalComponent } from './components/add-schedule-modal/add-schedule-modal.component';
import { AddHolidayModalComponent } from './components/add-holiday-modal/add-holiday-modal.component';
import { AccessGroupPanelComponent } from './panels/access-group-panel/access-group-panel.component';
import { SchedulePanelComponent } from './panels/schedule-panel/schedule-panel.component';
import { ZonePanelComponent } from './panels/zone-panel/zone-panel.component';
import { HolidayPanelComponent } from './panels/holiday-panel/holiday-panel.component';
import { SpinnerModule } from '@app-layouts/spinner/spinner.module';
import { AddZoneStepperComponent } from './components/add-zone-stepper/add-zone-stepper.component';
import { NameLocationComponent } from './components/add-zone-stepper/name-location/name-location.component';
import { ZoneDoorComponent } from './components/add-zone-stepper/zone-door/zone-door.component';
import { ZoneConfirmComponent } from './components/add-zone-stepper/zone-confirm/zone-confirm.component';
import { ControlAccessFilterPanelComponent } from './components/control-access-filter-panel/control-access-filter-panel.component';

@NgModule({
    declarations: [
        ControlAccessComponent,
        ControlAccessGroupsComponent,
        ControlSchedulesComponent,
        ControlZonesComponent,
        ControlHolidaysComponent,
        AddScheduleModalComponent,
        AddHolidayModalComponent,
        AccessGroupPanelComponent,
        SchedulePanelComponent,
        ZonePanelComponent,
        HolidayPanelComponent,
        AddZoneStepperComponent,
        NameLocationComponent,
        ZoneDoorComponent,
        ZoneConfirmComponent,
        ControlAccessFilterPanelComponent,
    ],
    imports: [
        CommonModule,
        ControlAccessRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatTabsModule,
        MatSelectModule,
        MatInputModule,
        MatMenuModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatDialogModule,
        MatSnackBarModule,
        DirectivesModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatTooltipModule,
        MatChipsModule,
        MatSlideToggleModule,
        MatCheckboxModule,
        PipesModule,
        SpinnerModule
    ],
    providers: [
        NgDialogAnimationService,
        ConfirmService
    ]
})
export class ControlAccessModule { }
