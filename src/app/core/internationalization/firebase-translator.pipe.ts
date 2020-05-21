import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'firestoreTranslator'
})
export class FirestoreTranslator implements PipeTransform {

  transform(dataDescription: any, field: string): string {
    var userLang = navigator.language; 
    const index = userLang.includes("es") ? field : `${field}_en`;
    const data = dataDescription[index]
    if (data) {
      return data
    } else {
      return dataDescription[field]
    }
  }


}
