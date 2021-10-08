import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTabsModule } from '@angular/material/tabs';

import { NgxMaskModule, IConfig } from 'ngx-mask';
import { PipesModule } from '@app-shared/pipes/pipes.module';

import { AddUserStepperComponent } from './add-user-stepper/add-user-stepper.component';
import { UserInfoComponent } from './add-user-stepper/comps/user-info/user-info.component';
import { CreateCardComponent } from './add-user-stepper/comps/create-card/create-card.component';
import { PairCardComponent } from './add-user-stepper/comps/pair-card/pair-card.component';
import { NewCardAddedComponent } from './add-user-stepper/comps/new-card-added/new-card-added.component';
import { AddAccessGroupComponent } from './add-user-stepper/comps/add-access-group/add-access-group.component';
import { CustomCalendarHeaderComponent } from './custom-calendar-header/custom-calendar-header.component';
import { CustomAccessStepperComponent } from './custom-access-stepper/custom-access-stepper.component';
import { AddZoneDoorComponent } from './custom-access-stepper/comps/add-zone-door/add-zone-door.component';
import { AddScheduleComponent } from './custom-access-stepper/comps/add-schedule/add-schedule.component';
import { CustomAccessGroupComponent } from './custom-access-stepper/comps/custom-access-group/custom-access-group.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { TimeSlotComponent } from './time-slot/time-slot.component';
import { AddingHolidayTabComponent } from './adding-holiday-tab/adding-holiday-tab.component';
import { SpinnerModule } from '@app-layouts/spinner/spinner.module';

const options: Partial<IConfig> | (() => Partial<IConfig>) = {};

@NgModule({
    declarations: [
        AddUserStepperComponent,
        UserInfoComponent,
        CreateCardComponent,
        PairCardComponent,
        NewCardAddedComponent,
        AddAccessGroupComponent,
        CustomCalendarHeaderComponent,
        CustomAccessStepperComponent,
        AddZoneDoorComponent,
        AddScheduleComponent,
        CustomAccessGroupComponent,
        ConfirmModalComponent,
        TimeSlotComponent,
        AddingHolidayTabComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatTooltipModule,
        MatDatepickerModule,
        MatSelectModule,
        MatChipsModule,
        MatTabsModule,
        MatDialogModule,
        MatSlideToggleModule,
        MatCheckboxModule,
        PipesModule,
        SpinnerModule,
        NgxMaskModule.forRoot(options)
    ]
})
export class ComponentsModule { }
