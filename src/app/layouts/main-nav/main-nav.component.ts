import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { AuthenticationService } from '@app-core/services/authentication.service';
import { GlobalShareService } from '@app-core/services/global-share.service';
import { AccountModalComponent } from '@app-layouts/account-modal/account-modal.component';
import { NotificationComponent } from '@app-layouts/notification/notification.component';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { Subject } from 'rxjs';
import { filter, finalize, takeUntil } from 'rxjs/operators';
import { User } from 'src/app/api_codegen';

@Component({
    selector: 'app-main-nav',
    templateUrl: './main-nav.component.html',
    styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit, OnDestroy {

    destroy$ = new Subject();
    collapsed = false;
    focused = false;
    dropdownActive = true;
    @ViewChild('userTrigger') protected userTrigger!: MatMenuTrigger;
    rippleColor = `rgba(2,145,255,0.1)`;

    hideSide = false;
    filterKey = '';
    loggedInUser: User;
    role: any;

    constructor(
        public router: Router,
        private route: ActivatedRoute,
        private shareService: GlobalShareService,
        private dialog: NgDialogAnimationService,
        private authService: AuthenticationService,
    ) {
        this.shareService.sidenavCollapsed$.next(this.collapsed);
        this.route.data.subscribe(res => {
            if (res && res.hideSidenav) {
                this.hideSide = true;
            }
        })
        this.router.events.pipe(
            takeUntil(this.destroy$),
            filter(event => event instanceof NavigationStart)
        ).subscribe(event => {
            this.filterKey = '';
            this.shareService.searchKey$.next('');
        })
        this.loggedInUser = this.authService.loggedInUser;
        this.role = this.loggedInUser.roles[0];
    }

    ngOnInit(): void {

    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    expandNav() {
        this.collapsed = !this.collapsed;
        this.shareService.sidenavCollapsed$.next(this.collapsed);
    }

    menuTrigger() {
        if (!this.collapsed) {
            this.userTrigger.toggleMenu();
        }
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        console.log('filterKey---', filterValue);
        this.shareService.searchKey$.next(filterValue);
    }

    openAccount(evt: MouseEvent) {
        const accountElement = new ElementRef(evt.currentTarget) as any;
        const rect = accountElement.nativeElement.getBoundingClientRect();
        const topPos = `${rect.bottom + 40}px`;
        this.dialog.open(AccountModalComponent, {
            disableClose: false,
            backdropClass: 'account-modal-backdrop',
            height: '390px',
            width: '350px',
            panelClass: 'account-modal',
            position: {
                top: topPos,
                right: '24px'
            }
        }).afterClosed().subscribe(res => {
            if (res) {

            }
        })
    }

    openNotifications() {
        this.dialog.open(NotificationComponent, {
            disableClose: false,
            panelClass: 'notification-panel',
            animation: {
                to: 'bottom',
                incomingOptions: {
                    keyframeAnimationOptions: {
                        duration: 300
                    }
                },
                outgoingOptions: {
                    keyframeAnimationOptions: {
                        duration: 150
                    }
                }
            },
            position: {
                rowStart: '1',
            },
        }).afterClosed().subscribe(res => {
            if (res) {
                console.log('notification res---', res);
            }
        });
    }

}
