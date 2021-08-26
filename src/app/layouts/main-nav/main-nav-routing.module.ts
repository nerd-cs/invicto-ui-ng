import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainNavComponent } from './main-nav.component';

const routes: Routes = [
    {
        path: '', component: MainNavComponent, children: [
            { path: '', redirectTo: 'users', pathMatch: 'full' },
            { path: 'dashboard', loadChildren: () => import('../../pages/dashboard/dashboard.module').then(m => m.DashboardModule) },
            { path: 'users', loadChildren: () => import('../../pages/users/users.module').then(m => m.UsersModule) },
            { path: 'control-access', loadChildren: () => import('../../pages/control-access/control-access.module').then(m => m.ControlAccessModule) },
            { path: 'activities', loadChildren: () => import('../../pages/activities/activities.module').then(m => m.ActivitiesModule) },
            { path: 'configuration', loadChildren: () => import('../../pages/configuration/configuration.module').then(m => m.ConfigurationModule) },
            { path: 'help', loadChildren: () => import('../../pages/help/help.module').then(m => m.HelpModule) },
            { path: 'management', loadChildren: () => import('../../pages/management/management.module').then(m => m.ManagementModule) }
        ]
    },
    {
        path: 'account', component: MainNavComponent, data: { hideSidenav: true }, children: [
            { path: '', loadChildren: () => import('../../pages/account/account.module').then(m => m.AccountModule) }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainNavRoutingModule { }
