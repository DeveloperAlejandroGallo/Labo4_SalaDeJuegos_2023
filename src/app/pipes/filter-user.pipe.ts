import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from '../models/user.interface';

@Pipe({
  name: 'filterUser'
})
export class FilterUserPipe implements PipeTransform {

  transform(value: Array<Usuario>, ...args: string[]): Array<Usuario> {

    let listadoUsuarios: Array<Usuario>;
    let sinUsuarioId: string = args[0];
    let filtro: string = args[1];


    listadoUsuarios = value.filter(usr =>
      (usr.nombre.toLocaleLowerCase().indexOf(filtro.toLocaleLowerCase()) > -1 ||
      usr.apellido.toLocaleLowerCase().indexOf(filtro.toLocaleLowerCase()) > -1) &&
      (usr.id != sinUsuarioId )
      )

    return listadoUsuarios!;

  }

}
