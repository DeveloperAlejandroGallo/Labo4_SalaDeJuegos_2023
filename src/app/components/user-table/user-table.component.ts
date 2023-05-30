import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Usuario } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit{

  @Input() nombreBuscado: string="";
  @Output() usuarioSeleccionado: EventEmitter<Usuario> = new EventEmitter<Usuario>();

  listadoDeUsuariosAMostrar!: Array<Usuario>;
  usuarioActual!: Usuario | undefined;

  constructor(
    private usuariosServices: UsuarioService,
    private authService: AuthService
  ){}

  ngOnInit(): void {
    this.listadoDeUsuariosAMostrar = this.usuariosServices.listadoUsuarios;
    this.usuarioActual = this.authService.usuarioActual;
  }

  emitirUsuario(usuario: Usuario){
    this.usuarioSeleccionado.emit(usuario);
  }
}
