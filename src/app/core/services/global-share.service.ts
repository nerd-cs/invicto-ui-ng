import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GlobalShareService {

    public sidenavCollapsed$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public searchKey$: BehaviorSubject<string> = new BehaviorSubject<string>('');

    constructor() { }
}
