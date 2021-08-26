import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'dates'
})
export class DatesPipe implements PipeTransform {

    transform(date: Date | string, ...args: any[]): Date | string {
        return moment(date).format(...args);
    }

}
