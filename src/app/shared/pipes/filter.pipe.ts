import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], ...args: any[]): any[] {
    const searchText = args[0];
    if (!items) { return []; }
    if (!searchText) { return items; }
    let key: string | number;
    if (args[1]) {
      key = args[1];
      return items.filter(item => {
        return String(item[key]).toLowerCase().includes(searchText.toLowerCase());
      });
    } else {
      return items.filter(item => {
        return Object.keys(item).some(res => {
          return String(item[res]).toLowerCase().includes(searchText.toLowerCase());
        });
      });
    }

    // array.filter((obj: any) => Object
    //     .values(obj)
    //     .some((val: any) => val
    //       .toString()
    //       .toLowerCase()
    //       .includes(searchKey.toLowerCase())))
  }
}
