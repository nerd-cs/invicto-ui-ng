import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmService } from '@app-core/services/confirm.service';
import { AccountService, UpdateAccountDto } from 'src/app/api_codegen';

@Component({
  selector: 'app-communication-edit-panel',
  templateUrl: './communication-edit-panel.component.html',
  styleUrls: ['./communication-edit-panel.component.scss']
})
export class CommunicationEditPanelComponent implements OnInit {

    communicationForm: FormGroup = new FormGroup({});


    constructor(
        private dialogRef: MatDialogRef<CommunicationEditPanelComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder,
        private confirmService: ConfirmService,
        private router: Router,
        private accountService: AccountService
    ) {

    }

    ngOnInit(): void {
        this.communicationForm = this.fb.group({
            frequence: ['Monthly', Validators.required],
            preference: ['Email', Validators.required],
            newsletter: [true, Validators.required],
        });
    }

    update() {
        return;
        // const body: any = {
        //     frequence: this.communicationForm.controls['frequence'].value,
        //     preference: this.communicationForm.controls['preference'].value,
        //     newsletter: this.communicationForm.controls['country'].value,
        // }
        // this.accountService.accountControllerUpdateAccount(body).subscribe(res => {
        //     this.dialogRef.close(true);
        // })
    }
}
