import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'orderviewFilter',
    pure: false
})
export class OrderviewFilterPipe extends DatePipe implements PipeTransform  {
    //transform(items: any[], filter: Object): any {
      transform(items: any[], filter: string): any {
        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        //return items.filter(item => item.title.indexOf(filter.title) !== -1);
        
        return items.filter(item =>{ 
            let dt=new Date(item.orderdate);
            let dtpipe:DatePipe=new DatePipe('en_GB');
            let formateddt:string= dtpipe.transform(dt, 'dd/MM/yyyy');
            if (item.customer.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
                return true;
            else if (item.orderno.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
                return true;
            else if (formateddt.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
                return true;
            else
                return false;
        });
    }
}