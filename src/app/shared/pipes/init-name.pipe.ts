import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initName'
})
export class InitNamePipe implements PipeTransform {

	transform(name: string, ...args: any[]): any {
		const splits = name.split(' ');
		if (splits.length === 1) {
			return splits[0].charAt(0).toUpperCase();
		} else if (splits[0].includes('-')) {
			const names = splits[0].split('-');
			return names[0].charAt(0).toUpperCase() + names[1].charAt(0).toUpperCase();
		} else if (splits[1].includes('-')) {
			return splits[0].charAt(0).toUpperCase() + splits[1].charAt(0).toUpperCase();
		} else {
			return splits[0].charAt(0).toUpperCase() + splits[splits.length - 1].charAt(0).toUpperCase();
		}
	}
}
