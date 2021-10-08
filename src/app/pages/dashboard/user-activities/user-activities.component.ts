import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MatTableDataSource } from '@angular/material/table';
import { NgDialogAnimationService } from 'ng-dialog-animation';

import { GlobalShareService } from '@app-core/services/global-share.service';
import moment from 'moment';


export type CardStatusTypes = 'Check-in' | 'Check-out' | 'Denied';
export interface CardsData {
    id: string;
    name: string;
    status: CardStatusTypes;
};

@Component({
    selector: 'app-user-activities',
    templateUrl: './user-activities.component.html',
    styleUrls: ['./user-activities.component.scss']
})
export class UserActivitiesComponent implements OnInit {

    selected = 'All locations'

    displayedColumns: string[] = ['name', 'statusL'];
    dataSource: MatTableDataSource<CardsData>;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private dialog: NgDialogAnimationService,
        private shareService: GlobalShareService
    ) {
        const cards: CardsData[] = [
            {
                id: '0',
                name: 'John D',
                status: 'Check-in'
            },
            {
                id: '1',
                name: 'Aiden W',
                status: 'Check-out'
            },
            {
                id: '2',
                name: 'Kevin D',
                status: 'Denied'
            },
            {
                id: '3',
                name: 'John D',
                status: 'Check-in'
            },
            {
                id: '4',
                name: 'Aiden W',
                status: 'Check-out'
            },
            {
                id: '5',
                name: 'Kevin D',
                status: 'Denied'
            },
            {
                id: '6',
                name: 'John D',
                status: 'Check-in'
            }
        ];
        this.dataSource = new MatTableDataSource(cards);
    }

    ngOnInit(): void {
    }
}
