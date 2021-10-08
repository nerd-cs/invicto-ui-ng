import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './filter.pipe';
import { DatesPipe } from './dates.pipe';
import { LiteralPipe } from './literal.pipe';
import { InitNamePipe } from './init-name.pipe';



@NgModule({
    declarations: [
        FilterPipe,
        DatesPipe,
        LiteralPipe,
        InitNamePipe
    ],
    imports: [
        CommonModule
    ],
    exports: [
        FilterPipe, DatesPipe, LiteralPipe, InitNamePipe
    ]
})
export class PipesModule { }
