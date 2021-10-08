import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-confirm-modal',
    templateUrl: './confirm-modal.component.html',
    styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

    title: string;
    confirmTitle: string;
    cancelTitle: string;

    constructor(
        private dialogRef: MatDialogRef<ConfirmModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.title = this.data.title;
        this.confirmTitle = this.data.confirmTitle;
        this.cancelTitle = this.data.cancelTitle ? this.data.cancelTitle : 'CANCEL'
    }

    ngOnInit(): void {
    }

    save() {
        this.dialogRef.close(true);
    }

}
