import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountService } from 'src/app/api_codegen';

@Component({
  selector: 'app-two-step-panel',
  templateUrl: './two-step-panel.component.html',
  styleUrls: ['./two-step-panel.component.scss']
})
export class TwoStepPanelComponent implements OnInit {

    constructor(
        private dialogRef: MatDialogRef<TwoStepPanelComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private accountService: AccountService
    ) { }

    ngOnInit(): void {

    }

    update() {
        console.log('TODO:')
    }

}
