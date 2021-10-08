import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TwoFaComponent } from "../signin/two-fa/two-fa.component";
import { SecurityPhoneComponent } from "./security-phone/security-phone.component";
import { SignupComponent } from "./signup.component";


const routes: Routes = [
    {
        path: '', component: SignupComponent
    },
    {
        path: 'security', component: SecurityPhoneComponent
    },
    {
        path: 'confirm-code', component: TwoFaComponent
    }
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class SignupRoutingModule { }
