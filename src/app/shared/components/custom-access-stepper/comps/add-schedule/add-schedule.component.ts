import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmService } from '@app-core/services/confirm.service';
import { AddingHolidayTabComponent } from '@app-shared/components/adding-holiday-tab/adding-holiday-tab.component';
import { TimeSlotComponent } from '@app-shared/components/time-slot/time-slot.component';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { zip } from 'rxjs';
import { take } from 'rxjs/operators';
import { CreateScheduleDto, HolidayService, ScheduleService, ZoneService } from 'src/app/api_codegen';
@Component({
    selector: 'app-add-schedule',
    templateUrl: './add-schedule.component.html',
    styleUrls: ['./add-schedule.component.scss']
})
export class AddScheduleComponent implements OnInit {

    @Input() customZoneData: any;
    @Output() cancel: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() stepUpdate: EventEmitter<number> = new EventEmitter<number>();
    @Output() customZoneSchedule: EventEmitter<any> = new EventEmitter<any>();

    weekdays: any = [
        {
            day: 'Monday', status: false, schedules: []
        },
        {
            day: 'Tuesday', status: false, schedules: []
        },
        {
            day: 'Wednesday', status: false, schedules: []
        },
        {
            day: 'Thursday', status: false, schedules: []
        },
        {
            day: 'Friday', status: false, schedules: []
        },
        {
            day: 'Saturday', status: false, schedules: []
        },
        {
            day: 'Sunday', status: false, schedules: []
        }
    ]

    holidayList: any[] = [];
    scheduleForm!: FormGroup;
    holidays: any[] = [];

    constructor(
        private fb: FormBuilder,
        private dialog: MatDialog,
        private zoneService: ZoneService,
        private toastr: ToastrService,
        private confirmService: ConfirmService,
        private scheduleService: ScheduleService,
        private holidayService: HolidayService
    ) { }

    ngOnInit(): void {
        console.log('hello---------', this.customZoneData);
        this.scheduleForm = this.fb.group({
            name: ['', Validators.required],
            description: [''],
        })
    }

    gotoStep(step: number) {
        if (step === 3) {
            const addCustomZone = this.zoneService.zoneControllerCreateZone(this.customZoneData).pipe(take(1))
            const addCustomSchedule = this.scheduleService.scheduleControllerCreateSchedule(this.newScheduleBody()).pipe(take(1));
            zip(addCustomZone, addCustomSchedule).subscribe(res => {
                const newZoneSchedule = {
                    zone: res[0],
                    schedule: res[1]
                }
                this.customZoneSchedule.emit(newZoneSchedule);
                this.toastr.success('Custom Zone & Schedule added');
                this.stepUpdate.emit(step);
            }, (err: any) => {
                console.log('err occurred', err);
                this.toastr.error(err.error.error);
            })
        } else {
            this.stepUpdate.emit(step);
        }
    }
    newScheduleBody() {
        let timeTables: any[] = [];
        this.weekdays.forEach((element: any) => {
            let timeSlots: any[] = [];
            element.schedules.map((item: any) => {
                timeSlots.push({ startTime: item.startTime, endTime: item.endTime })
            })
            timeTables.push({
                day: element.day.toUpperCase(),
                isActive: element.status,
                timeslots: timeSlots
            })
        });
        let holidays: any[] = [];
        this.holidays.forEach((element: any) => {
            let timeSlots: any[] = [];
            element.schedules.map((item: any) => {
                timeSlots.push({ startTime: item.startTime, endTime: item.endTime })
            })
            holidays.push({
                holidayId: element.id,
                isActive: element.status,
                timetables: timeSlots
            })
        });
        const newSchedule: CreateScheduleDto = {
            name: this.scheduleForm.controls['name'].value,
            description: this.scheduleForm.controls['description'].value,
            timetables: timeTables,
            holidays: holidays
        }
        return newSchedule;
    }

    close() {
        this.cancel.emit(true);
    }

    toogleChange(evt: any, day: any, idx: number, type: string) {
        if (evt.checked && day.schedules.length === 0 && type === 'weekday') {
            this.weekdays[idx].schedules = [{ startTime: '12:00 AM', endTime: '12:00 AM' }]
        } else if (evt.checked && day.schedules.length === 0 && type === 'holiday') {
            this.holidays[idx].schedules = [{ startTime: '12:00 AM', endTime: '12:00 AM' }]
        }
    }


    addHoliday() {
        this.dialog.open(AddingHolidayTabComponent, {
            disableClose: false,
            panelClass: 'adding-holiday-tab',
            data: {
                selectedHoliday: this.holidays
            }
        }).afterClosed().subscribe(res => {
            if (res) {
                this.holidays = [];
                res.forEach((element: any) => {
                    const item = {
                        id: element.id,
                        holiday: element.name,
                        status: element.checked,
                        schedules: [{ startTime: '12:00 AM', endTime: '12:00 AM' }]
                    }
                    this.holidays.push(item);
                });
                this.confirmService.openSnackBar('New holiday added ! 🎉🎉🎉');
            }
        })
    }

    deleteHoliday(idx: number) {
        this.holidays.splice(idx, 1);
    }

    addTimeSlot(idx: number, type: string) {

        this.dialog.open(TimeSlotComponent, {
            disableClose: true,
            panelClass: 'time-slot-modal',
            data: {
                mode: 'add',
                type: type
            }
        }).afterClosed().subscribe(res => {
            console.log('add time slot', res);
            if (res.mode === 'add' && type === 'weekday') {
                this.weekdays[idx].schedules.push(res.timeSlot);
            }
            if (res.mode === 'add' && type === 'holiday') {
                this.holidays[idx].schedules.push(res.timeSlot);
            }
        });
    }

    editTimeSlot(dayIdx: number, slotIdx: number, schedule: any, type: string) {
        console.log(type, schedule, 'edit---')
        this.dialog.open(TimeSlotComponent, {
            disableClose: true,
            panelClass: 'time-slot-modal',
            data: {
                mode: 'edit',
                type: type,
                schedule: schedule
            }
        }).afterClosed().subscribe(res => {
            console.log('edit time slot', res);
            if (res === 'delete' && type === 'weekday') {
                this.weekdays[dayIdx].schedules.splice(slotIdx, 1)
            } else if (res === 'delete' && type === 'holiday') {
                this.holidays[dayIdx].schedules.splice(slotIdx, 1)
            } else if (res.mode === 'edit' && type === 'weekday') {
                this.weekdays[dayIdx].schedules.splice(slotIdx, 1, res.timeSlot)
            } else if (res.mode === 'edit' && type === 'holiday') {
                this.holidays[dayIdx].schedules.splice(slotIdx, 1, res.timeSlot)
            }
        });
    }
}
