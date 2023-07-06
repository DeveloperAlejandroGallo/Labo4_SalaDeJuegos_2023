import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  constructor() { }

  Info(msg: string) {
    Swal.fire({
      title: 'Información',
      text: msg,
      icon: 'info'
    });
  }


  Exito(msg: string) {
    Swal.fire({
      title: 'Éxito',
      text: msg,
      icon: 'success'
    });
  }

  Warning(msg: string) {
    Swal.fire({
      title: 'Advertencia!',
      text: msg,
      icon: 'warning'
    });
  }

  Error(msg: string) {
    Swal.fire({
      title: 'Error',
      text: msg,
      icon: 'error'
    });
  }


}
