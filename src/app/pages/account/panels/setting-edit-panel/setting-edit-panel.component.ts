import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmService } from '@app-core/services/confirm.service';
import { AccountService } from 'src/app/api_codegen';
import { CommunicationEditPanelComponent } from '../communication-edit-panel/communication-edit-panel.component';

@Component({
    selector: 'app-setting-edit-panel',
    templateUrl: './setting-edit-panel.component.html',
    styleUrls: ['./setting-edit-panel.component.scss']
})
export class SettingEditPanelComponent implements OnInit {

    settingForm: FormGroup = new FormGroup({});


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
        this.settingForm = this.fb.group({
            language: ['English', Validators.required],
            timezone: ['EDT', Validators.required],
        });
    }

    update() {
        return;
    }
}
