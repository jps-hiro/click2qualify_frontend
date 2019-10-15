import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gatewayFilter'
})
export class GatewayFilterPipe implements PipeTransform {

  transform(items: any[], filter: string): any {
    if(!items || !filter) {
      return items;
    }
    return items.filter(item => item.title.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
  }
}