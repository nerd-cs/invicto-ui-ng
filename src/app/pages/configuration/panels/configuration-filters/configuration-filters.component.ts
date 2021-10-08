import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-configuration-filters',
    templateUrl: './configuration-filters.component.html',
    styleUrls: ['./configuration-filters.component.scss']
})
export class ConfigurationFiltersComponent implements OnInit {

    filterForm: FormGroup = new FormGroup({});
    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<ConfigurationFiltersComponent>,
    ) { }

    ngOnInit(): void {
        this.filterForm = this.fb.group({
            status: ['All', Validators.required],
            location: ['211 Rue De La Gauchetiere, Quebec, J7K 0T8', Validators.required]
        })
    }

    applyFilter() {
        this.dialogRef.close(true);
    }
}
