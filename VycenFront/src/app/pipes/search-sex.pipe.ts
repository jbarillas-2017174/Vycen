import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchSex'
})
export class SearchSexPipe implements PipeTransform {

  transform(product: any, search: any) {
    if (search == undefined) {
      return product
    } else {
      return product.filter((product: any) => {
        return product.sex.includes(search)
      })
    }
  }

}
