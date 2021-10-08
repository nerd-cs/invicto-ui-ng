import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-control-access-filter-panel',
    templateUrl: './control-access-filter-panel.component.html',
    styleUrls: ['./control-access-filter-panel.component.scss']
})
export class ControlAccessFilterPanelComponent implements OnInit, OnDestroy {
    private destroy$ = new Subject();

    filterForm!: FormGroup;

    constructor(
        private dialogRef: MatDialogRef<ControlAccessFilterPanelComponent>,
        private fb: FormBuilder
    ) { }

    ngOnInit(): void {
        this.filterForm = this.fb.group({
            locations: ['All', Validators.required],
            organizations: ['All', Validators.required],
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

}
