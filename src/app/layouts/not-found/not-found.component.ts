import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-not-found',
    template: `
        <div class="w-full h-screen flex-center flex-col bg-gray-200 ">
            <h4 class="mb-5 col-black -mt-20">Ooops. Page Not Found</h4>
            <img src="assets/images/vector/vc1.png" alt="" class="mt-3">
            <h6 class="text-blue-500 cursor-pointer mt-5 hover: underline" (click)="location.back()">Go back</h6>
        </div>
    `
})
export class NotFoundComponent implements OnInit {

    constructor(
        public location: Location
    ) { }

    ngOnInit(): void { }
}
