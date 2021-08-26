import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ConfControllerEditComponent } from '../conf-controller-edit/conf-controller-edit.component';

@Component({
  selector: 'app-conf-door-edit',
  templateUrl: './conf-door-edit.component.html',
  styleUrls: ['./conf-door-edit.component.scss']
})
export class ConfDoorEditComponent implements OnInit {


    doorForm: FormGroup = new FormGroup({});
    constructor(
        private dialogRef: MatDialogRef<ConfDoorEditComponent>,
        private fb: FormBuilder
    ) { }

    ngOnInit(): void {
        this.doorForm = this.fb.group({
            name: ['Lobby #2', Validators.required],
        });
    }
}
