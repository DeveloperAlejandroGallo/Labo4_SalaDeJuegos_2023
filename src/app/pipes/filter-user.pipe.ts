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
      (usr.nombre.toLocaleLowerCase().includes(filtro.toLocaleLowerCase()) ||
      usr.apellido.toLocaleLowerCase().includes(filtro.toLocaleLowerCase()) ) &&
      (usr.id != sinUsuarioId )
      )

    return listadoUsuarios!;

  }

}
