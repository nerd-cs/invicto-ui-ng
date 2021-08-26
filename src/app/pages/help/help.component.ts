import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-help',
    template: `
    <div class="h5 col-black pt-8"> Help </div>
    <div class="help-section px-52 pt-28 flex-center flex-col">
        <div class="h6 col-black text-center">Need help ? Let our team contact you </div>
        <a href="mailto:help@invicto.com" target="_top" class="text-body-lg col-blue cursor-pointer mt-2 hover:underline">HELP@INVICTO.COM</a>
        <img src="assets/images/vector/vc4.png" style="width: 444px; height: 444px;" class="mt-10">
    </div>
    `
})
export class HelpComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

}
