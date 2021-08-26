import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SigninComponent } from "./signin.component";
import { LostPasswordComponent } from "./lost-password/lost-password.component";
import { TwoFaComponent } from "./two-fa/two-fa.component";
import { EmailSentComponent } from "./email-sent/email-sent.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";


const routes: Routes = [
    {
        path: '', redirectTo: 'login', pathMatch: 'full'
    },
    {
        path: 'login', component: SigninComponent, pathMatch: 'full'
    },
    {
        path: 'login/password-reset', component: ResetPasswordComponent, pathMatch: 'full'
    },
    {
        path: '2fa', component: TwoFaComponent
    },
    {
        path: 'password-reset', component: LostPasswordComponent
    },
    {
        path: 'email-sent', component: EmailSentComponent
    }
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class SigninRoutingModule { }
