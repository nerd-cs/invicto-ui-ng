import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'literal'
})
export class LiteralPipe implements PipeTransform {

    transform(value: unknown, ...args: unknown[]): unknown {
        let val;
        switch (value) {
            case 'PENDING':
                val = 'Pending';
                break;
            case 'INCOMPLETE':
                val = 'Incomplete';
                break;
            case 'ACTIVE':
                val = 'Active';
                break;
            case 'INACTIVE':
                val = 'Inactive';
                break;
            case 'ARCHIVED':
                val = 'Archived';
                break;
            case 'GUEST':
                val = 'Guest';
                break;
            case 'MEMBER':
                val = 'Member';
                break;
            case 'TIER_ADMIN':
                val = 'Tier admin';
                break;
            case 'ADMIN':
                val = 'Admin';
                break;
            case 'KEY':
                val = 'Key';
                break;
            case 'MOBILE':
                val = 'Mobile';
                break;
            case 'ONCE':
                val = 'Once';
                break;
            case 'EVERY_MONTH':
                val = 'Every month';
                break;
            case 'EVERY_YEAR':
                val = 'Every year';
                break;
            default:
                break;
        }
        return val;
    }

}
