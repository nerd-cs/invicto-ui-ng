import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { MatCalendarHeader } from '@angular/material/datepicker';

@Component({
    selector: 'hadsup-custom-calendar-header',
    templateUrl: './custom-calendar-header.component.html',
    styleUrls: ['./custom-calendar-header.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomCalendarHeaderComponent<D> extends MatCalendarHeader<D> {
}
