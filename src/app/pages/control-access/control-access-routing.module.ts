import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ControlAccessComponent } from './control-access.component';

const routes: Routes = [
    {
        path: '', component: ControlAccessComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ControlAccessRoutingModule { }
