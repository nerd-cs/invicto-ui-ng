import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GlobalShareService } from '@app-core/services/global-share.service';
import { ConfirmService } from '@app-core/services/confirm.service';
import { FiltersPanelComponent } from '@app-pages/users/all-users/filters-panel/filters-panel.component';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { RightSideDlgAnimation } from '@app-core/models/common';

@Component({
    selector: 'app-control-access',
    templateUrl: './control-access.component.html',
    styleUrls: ['./control-access.component.scss']
})

export class ControlAccessComponent implements OnInit, OnDestroy {

    private destroy$ = new Subject();
    sidenavCollapsed!: boolean;

    selected = 0;
    constructor(
        private shareService: GlobalShareService,
        private confirmService: ConfirmService,
        private dialog: NgDialogAnimationService
    ) { }

    ngOnInit(): void {
        this.shareService.sidenavCollapsed$.pipe(takeUntil(this.destroy$)).subscribe(res => {
            this.sidenavCollapsed = res;
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    selectedIndexChange($event: number) {
        this.selected = $event
    }

    openFilters() {
        this.dialog.open(FiltersPanelComponent, {
            disableClose: false,
            panelClass: 'right-side-panel',
            animation: RightSideDlgAnimation,
            position: {
                rowStart: '1',
            }
        }).afterClosed().subscribe(res => {
            if (res) {
                console.log('filter panel res---', res);
            }
        });
    }
}
