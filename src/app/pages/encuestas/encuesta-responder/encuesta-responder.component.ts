import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-encuesta-responder',
  templateUrl: './encuesta-responder.component.html',
  styleUrls: ['./encuesta-responder.component.scss']
})
export class EncuestaResponderComponent implements OnInit{

  usuarioConectado: Usuario | undefined = this.authSrv.logInfo();
  form: FormGroup;

  constructor(private authSrv: AuthService) {
    this.form = new FormGroup({
      nombreYApellido: new FormControl('', [Validators.required]),
      edad: new FormControl('', [Validators.required, Validators.min(18), Validators.max(99)]),
      telefono: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.maxLength(10)]),
      respuesta1: new FormControl('', [Validators.required]),
      respuesta2: new FormControl('', [Validators.required]),
      respuesta3: new FormControl('', [Validators.required]),
    });
   }

   get nombreYApellido() {
    return this.form.get('nombreYApellido');
  }

  get edad() {
    return this.form.get('edad');
  }

  get telefono() {
    return this.form.get('telefono');
  }

  get respuesta1() {
    return this.form.get('respuesta1');
  }

  get respuesta2() {
    return this.form.get('respuesta2');
  }

  get respuesta3() {
    return this.form.get('respuesta3');
  }



  ngOnInit(): void {

  }

  onSubmit(){

  }


}
