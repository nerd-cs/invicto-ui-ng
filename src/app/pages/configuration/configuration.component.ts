import { Component, OnInit } from '@angular/core';
import { RightSideDlgAnimation } from '@app-core/models/common';
import { GlobalShareService } from '@app-core/services/global-share.service';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConfigurationFiltersComponent } from './panels/configuration-filters/configuration-filters.component';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

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
        this.dialog.open(ConfigurationFiltersComponent, {
            disableClose: false,
            panelClass: 'right-side-panel',
            animation: RightSideDlgAnimation,
            position: {
                rowStart: '1',
            }
        }).afterClosed().subscribe(res => {
            if (res) {
                console.log('apply res---', res);
            }
        });
    }
}
