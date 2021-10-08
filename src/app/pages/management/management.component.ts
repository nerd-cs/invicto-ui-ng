import { Component, OnInit } from '@angular/core';
import { RightSideDlgAnimation } from '@app-core/models/common';
import { GlobalShareService } from '@app-core/services/global-share.service';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {

    private destroy$ = new Subject();
    sidenavCollapsed!: boolean;

    selected = 0;
    constructor(
        private shareService: GlobalShareService,
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
    }
}
