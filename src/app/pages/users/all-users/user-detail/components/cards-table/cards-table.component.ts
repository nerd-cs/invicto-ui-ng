import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MatTableDataSource } from '@angular/material/table';
import { NgDialogAnimationService } from 'ng-dialog-animation';

import { GlobalShareService } from '@app-core/services/global-share.service';
import moment from 'moment';
import { CardEditComponent } from '../card-edit/card-edit.component';
import { RightSideDlgAnimation } from '@app-core/models/common';
import { ChangeActivenessDto, UsersService } from 'src/app/api_codegen';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-cards-table',
    templateUrl: './cards-table.component.html',
    styleUrls: ['./cards-table.component.scss']
})
export class CardsTableComponent implements OnInit, OnChanges {

    @Input() cards: any[] = [];
    @Input() userId: number = 0;
    @Output() cardUpdated: EventEmitter<boolean> = new EventEmitter<boolean>();

    displayedColumns: string[] = ['type', 'cardNumber', 'lastActivityL', 'validity', 'status', 'actions'];
    dataSource!: MatTableDataSource<any>;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private cdRef: ChangeDetectorRef,
        private dialog: NgDialogAnimationService,
        private shareService: GlobalShareService,
        private usersService: UsersService,
        private toastr: ToastrService
    ) { }

    ngOnInit(): void {
        // console.log(this.cards, '=card=')
        this.dataSource = new MatTableDataSource(this.cards);
    }

    ngOnChanges(changes: SimpleChanges): void {
        const szCards = 'cards';
        // console.log('changes----', changes)
        if (changes.hasOwnProperty(szCards) && !changes[szCards].firstChange) {
            this.dataSource.disconnect();
            this.dataSource = new MatTableDataSource(this.cards);
        }
    }

    editCardPanel(card: any) {
        this.dialog.open(CardEditComponent, {
            disableClose: false,
            panelClass: 'right-side-panel',
            animation: RightSideDlgAnimation,
            position: {
                rowStart: '1',
            },
            data: {
                card: card,
                userId: this.userId
            }
        }).afterClosed().subscribe(res => {
            if (res) {
                this.cardUpdated.emit(true);
            }
        });
    }

    inactiveCard(card: any) {
        const body: ChangeActivenessDto = {
            isActive: false
        }
        this.usersService.usersControllerChangeCardActiveness(body, this.userId, card.id).subscribe(res => {
            // console.log('card inactive ---', res);
            this.toastr.success('Card Status InActive');
            this.cardUpdated.emit(true);
        })
    }

    removeCard(card: any) {
        this.usersService.usersControllerDeleteUserCard(this.userId, card.id).subscribe(res => {
            this.toastr.success('Card Deleted');
            this.cardUpdated.emit(true);
        })
    }
}
