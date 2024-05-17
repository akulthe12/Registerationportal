import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterpipe'
})
export class FilterpipePipe implements PipeTransform {

  transform(items: any[], term: string): any[] {
    if (!items || !term) {
      return items;
    }
    term = term.toLowerCase();
    return items.filter(item => item.firstName.toLowerCase().includes(term));
  }

}
