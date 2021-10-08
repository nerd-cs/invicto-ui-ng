import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ImgFallbackDirective } from './img-fallback.directive';
import { HoverClassDirective } from './hover-class.directive';
import { AutoFocusDirective } from './auto-focus.directive'

@NgModule({
	declarations: [ImgFallbackDirective, HoverClassDirective, AutoFocusDirective],
	imports: [
		CommonModule
	],
	exports: [
		ImgFallbackDirective,
		HoverClassDirective,
        AutoFocusDirective

	]
})
export class DirectivesModule { }
