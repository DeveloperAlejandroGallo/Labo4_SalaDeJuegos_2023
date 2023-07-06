import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateIsoToDate'
})
export class DateIsoToDatePipe implements PipeTransform {

  transform(fecha: string): Date {
    return new Date(fecha);
  }

}
