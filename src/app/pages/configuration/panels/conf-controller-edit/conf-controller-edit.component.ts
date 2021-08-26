import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ControllerService, UpdateControllerDto } from 'src/app/api_codegen';

@Component({
  selector: 'app-conf-controller-edit',
  templateUrl: './conf-controller-edit.component.html',
  styleUrls: ['./conf-controller-edit.component.scss']
})
export class ConfControllerEditComponent implements OnInit {

    controllerForm: FormGroup = new FormGroup({});
    constructor(
        private dialogRef: MatDialogRef<ConfControllerEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder,
        private controllerService: ControllerService,
        private toastr: ToastrService
    ) { }

    ngOnInit(): void {
        this.controllerForm = this.fb.group({
            name: [this.data.controller.name, Validators.required],
        });
    }

    testController() {
        this.controllerService.controllerControllerTestController(this.data.controller.id).subscribe(res => {
            this.toastr.success('Controller Testing ');
        })
    }

    updateController() {
        const body: UpdateControllerDto = {
            id: this.data.controller.id,
            name: this.controllerForm.controls['name'].value
        }
        this.controllerService.controllerControllerUpdateController(body).subscribe(res => {
            this.toastr.success('Controller Updated');
            this.dialogRef.close(true);
        })
    }

}
