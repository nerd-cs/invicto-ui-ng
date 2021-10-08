import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminsComponent } from './admins/admins.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { UserDetailComponent } from './all-users/user-detail/user-detail.component';
import { GuestsComponent } from './guests/guests.component';
import { TierAdminsComponent } from './tier-admins/tier-admins.component';

const routes: Routes = [
    {
        path: '', redirectTo: 'all-users'
    },
    {
        path: 'all-users', component: AllUsersComponent
    },
    {
        path: 'all-users/user-detail', component: UserDetailComponent
    },
    {
        path: 'admins', component: AdminsComponent
    },
    {
        path: 'admins/admin-detail', component: UserDetailComponent
    },
    {
        path: 'tier-admins', component: TierAdminsComponent
    },
    {
        path: 'tier-admins/tier-admin-detail', component: UserDetailComponent
    },
    {
        path: 'guests', component: GuestsComponent
    },
    {
        path: 'guests/guest-detail', component: UserDetailComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule { }
