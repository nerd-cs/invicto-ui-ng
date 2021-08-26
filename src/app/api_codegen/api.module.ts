import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { AccessGroupService } from './api/accessGroup.service';
import { AccountService } from './api/account.service';
import { AuthService } from './api/auth.service';
import { ControllerService } from './api/controller.service';
import { DoorService } from './api/door.service';
import { HolidayService } from './api/holiday.service';
import { LocationService } from './api/location.service';
import { ScheduleService } from './api/schedule.service';
import { UsersService } from './api/users.service';
import { ZoneService } from './api/zone.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    AccessGroupService,
    AccountService,
    AuthService,
    ControllerService,
    DoorService,
    HolidayService,
    LocationService,
    ScheduleService,
    UsersService,
    ZoneService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders<ApiModule> {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
