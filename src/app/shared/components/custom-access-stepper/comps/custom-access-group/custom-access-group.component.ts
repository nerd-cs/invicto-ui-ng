import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ConfirmService } from '@app-core/services/confirm.service';
import { Subject } from 'rxjs';
import { pairwise, startWith, takeUntil } from 'rxjs/operators';
import { Zone, ZoneService } from 'src/app/api_codegen';

@Component({
    selector: 'app-custom-access-group',
    templateUrl: './custom-access-group.component.html',
    styleUrls: ['./custom-access-group.component.scss']
})
export class CustomAccessGroupComponent implements OnInit, OnDestroy {

    private destroy$ = new Subject();

    @Input() locations: any[] = [];
    @Input() schedules: any[] = [];
    @Input() locationZoneDoorsInit: any;

    @Output() cancel: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() save: EventEmitter<any> = new EventEmitter<any>();
    @Output() stepUpdate: EventEmitter<number> = new EventEmitter<number>();
    @Output() locationZoneDoors: EventEmitter<any> = new EventEmitter<any>();

    zones: Zone[] = [];
    accessGroupForm!: FormGroup;
    zoneDoorItems: FormArray = new FormArray([]);
    setPrev = false;

    constructor(
        private fb: FormBuilder,
        private zoneService: ZoneService,
        private confirmService: ConfirmService
    ) { }

    ngOnInit(): void {
        let zoneDoorItems: any[] = [];
        console.log('URA_---------------', this.locationZoneDoorsInit);
        if (this.locationZoneDoorsInit) {
            this.zones = this.locationZoneDoorsInit.zones;
            this.locationZoneDoorsInit.tempZones.forEach((element: any) => {
                zoneDoorItems.push(this.fb.group({
                    zoneDoor: [element.zoneDoor, Validators.required],
                    schedule: [element.schedule, Validators.required]
                }));
            })
        }

        this.accessGroupForm = this.fb.group({
            name: [this.locationZoneDoorsInit?.name, Validators.required],
            location: [this.locationZoneDoorsInit?.location, Validators.required],
            zoneDoorItems: this.fb.array(zoneDoorItems)
        })
    }

    ngAfterViewInit(): void {
        this.accessGroupForm.controls['location'].valueChanges.pipe(
            takeUntil(this.destroy$),
            startWith(null),
            pairwise()
        ).subscribe(([prev, next]) => {
            if (this.setPrev) {
                this.setPrev = false;
                return;
            } else {
                console.log('res value changes----', prev, next);
                this.zoneService.zoneControllerGetAllForLocation(next.id).subscribe(zones => {
                    if (prev === null) {
                        this.zones = zones;
                        return;
                    } else {
                        this.confirmService.confirm('Current zones will be removed?', 'CONFIRM').afterClosed().subscribe((res) => {
                            if (res) {
                                this.accessGroupForm.controls['zoneDoorItems'] = this.fb.array([]);
                                this.zones = zones;
                            } else {
                                this.setPrev = true;
                                this.accessGroupForm.controls['location'].setValue(prev);
                            }
                        })
                    }
                })
            }
        })
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    objectCompareWith(o1: any, o2: any) { return o1?.name === o2?.name && o1?.id === o2?.id };

    close() {
        this.cancel.emit(true);
    }
    async gotoStep(step: number) {
        const zones = await this.zoneService.zoneControllerGetAllForLocation(this.accessGroupForm.controls['location'].value.id).toPromise();
        this.locationZoneDoors.emit({
            location: this.accessGroupForm.controls['location'].value,
            name: this.accessGroupForm.controls['name'].value,
            tempZones: this.accessGroupForm.controls['zoneDoorItems'].value,
            zones: zones
        });
        this.stepUpdate.emit(step);
    }

    saveGroup() {
        this.save.emit({ data: this.accessGroupForm.value });
    }

    get addCustomCheck() {
        return this.accessGroupForm.controls['location'].value;
    }
    get addLineCheck() {
        return this.zones.length > 0 ? true : false;
    }
    get addLineTooltip() {
        return this.addLineCheck ? '' : 'No available zones';
    }

    createLine() {
        return this.fb.group({
            zoneDoor: [null, Validators.required],
            schedule: [null, Validators.required]
        })
    }

    addLine() {
        if (!this.addLineCheck) {
            return;
        }
        this.zoneDoorItems = this.accessGroupForm.get('zoneDoorItems') as FormArray;
        this.zoneDoorItems.push(this.createLine());
    }
    removeLine(idx: number) {
        this.zoneDoorItems = this.accessGroupForm.get('zoneDoorItems') as FormArray;
        this.zoneDoorItems.removeAt(idx);
    }

    get controlsArray() {
        return (this.accessGroupForm.get('zoneDoorItems') as FormArray).controls;
    }
}
