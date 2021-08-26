import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './filter.pipe';
import { DatesPipe } from './dates.pipe';
import { LiteralPipe } from './literal.pipe';



@NgModule({
    declarations: [
        FilterPipe,
        DatesPipe,
        LiteralPipe
    ],
    imports: [
        CommonModule
    ],
    exports: [
        FilterPipe, DatesPipe, LiteralPipe
    ]
})
export class PipesModule { }
