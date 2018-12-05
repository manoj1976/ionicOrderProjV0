import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'productFilter',
    pure: false
})
export class ProductFilterPipe implements PipeTransform {
      transform(items: any[], filter: string): any {
        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        //return items.filter(item => item.title.indexOf(filter.title) !== -1);
        return items.filter(item =>{ 
            
            if (item.code.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
                return true;
            else if (item.description.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
                return true;
            else
                return false;
        });
    }
}