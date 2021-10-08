import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-name-location',
    templateUrl: './name-location.component.html',
    styleUrls: ['./name-location.component.scss']
})
export class NameLocationComponent implements OnInit {

    nameLocation!: FormGroup;

    @Output() cancel: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() step: EventEmitter<any> = new EventEmitter<any>();
    @Input() locations: any[] = [];

    constructor(
        private fb: FormBuilder
    ) { }

    ngOnInit(): void {
        console.log(this.locations, 'hey- input location')
        this.nameLocation = this.fb.group({
            name: ['', Validators.required],
            description: [''],
            location: ['']
        });
    }

    next() {
        this.step.emit({
            step: 3,
            data: this.nameLocation.value
        });
    }

    close() {
        this.cancel.emit(true);
    }

}
