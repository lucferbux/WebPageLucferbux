import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'firestoreTranslator'
})
export class FileSizePipe implements PipeTransform {

  transform(dataDescription: any, field: string, language: string): string {
    const index = language === "us" ? `${field}_us` : field
    const data = dataDescription[index]
    if (data) {
      return data
    } else {
      return dataDescription[field]
    }
  }


}
