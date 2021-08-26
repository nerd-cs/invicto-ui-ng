import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ConfirmModalComponent } from '@app-shared/components/confirm-modal/confirm-modal.component';

@Injectable({
    providedIn: 'root'
})
export class ConfirmService {

    constructor(
        private dialog: MatDialog,
        private snackBar: MatSnackBar
    ) { }

    confirm(title: string, confirmTitle: string, cancelTitle?: string) {
        const dialogRef = this.dialog.open(ConfirmModalComponent, {
            disableClose: true,
            panelClass: 'confirm-modal-panel',
            data: {
                title: title,
                confirmTitle: confirmTitle,
                cancelTitle: cancelTitle
            }
        })
        return dialogRef;
    }

    openSnackBar(message: string, hor?: MatSnackBarHorizontalPosition, ver?: MatSnackBarVerticalPosition, action?: string, time?: number) {
        const horizontalPos: MatSnackBarHorizontalPosition = hor || 'center';
        const verticalPos: MatSnackBarVerticalPosition = ver || 'bottom';
        const actionString = action || '✖';
        const duration = time || 5000;
        this.snackBar.open(message, actionString, {
            panelClass: 'app-snack-bar',
            horizontalPosition: horizontalPos,
            verticalPosition: verticalPos,
            duration: duration
        });
    }
}
