import { Pipe, PipeTransform } from '@angular/core';
import { Partida } from '../models/partida';

@Pipe({
  name: 'filterPartidas'
})
export class FilterPartidasPipe implements PipeTransform {

  transform(value: Array<Partida>, filterNombre: string): Array<Partida> {

    let lstPartidas: Array<Partida>;

    lstPartidas = value.filter(partida =>
      partida.jugador.nombre.toLocaleLowerCase().includes(filterNombre.toLocaleLowerCase())  ||
      partida.jugador.apellido.toLocaleLowerCase().includes(filterNombre.toLocaleLowerCase())  );


    return lstPartidas!;

  }

}
