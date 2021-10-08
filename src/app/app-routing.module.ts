import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app-core/guards/auth.guard';

const routes: Routes = [
    {
        path: '404', loadChildren: () => import('./layouts/not-found/not-found.module').then(m => m.NotFoundModule)
    },
    {
        path: '', canActivate: [AuthGuard], loadChildren: () => import('./layouts/main-nav/main-nav.module').then(m => m.MainNavModule)
    },
    {
        path: '', loadChildren: () => import('./pages/auth/signin/signin.module').then(m => m.SigninModule)
    },
    {
        path: 'signup', loadChildren: () => import('./pages/auth/signup/signup.module').then(m => m.SignupModule)
    },
    {
        path: '**', redirectTo: '404'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
