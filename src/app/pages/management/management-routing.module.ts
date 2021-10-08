import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagementComponent } from './management.component';
import { OrganizationDetailComponent } from './components/organization-detail/organization-detail.component';

const routes: Routes = [
    {
        path: '', component: ManagementComponent
    },
    {
        path: 'company-detail', component: OrganizationDetailComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManagementRoutingModule { }
