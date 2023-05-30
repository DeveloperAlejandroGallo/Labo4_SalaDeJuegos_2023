import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Usuario } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-chat-table',
  templateUrl: './chat-table.component.html',
  styleUrls: ['./chat-table.component.scss']
})
export class ChatTableComponent {

  @Input() nombreBuscado: string="";
  @Output() usuarioSeleccionado: EventEmitter<Usuario> = new EventEmitter<Usuario>();

  listadoDeUsuariosAMostrar!: Array<Usuario>;
  usuarioActual!: Usuario;

  constructor(
    private usuariosServices: UsuarioService,
    private authService: AuthService
  ){}

  ngOnInit(): void {
    this.listadoDeUsuariosAMostrar = this.usuariosServices.listadoUsuarios;

    this.authService.currentUser
  }

  emitirUsuario(usuario: Usuario){
    this.usuarioSeleccionado.emit(usuario);
  }
}
