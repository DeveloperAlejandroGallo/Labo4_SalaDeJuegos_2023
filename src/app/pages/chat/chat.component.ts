import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Chat } from 'src/app/models/chat';
import { Usuario } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit{

  constructor(private auth: AuthService,
              private userService: UsuarioService,
              private chatService: ChatService) {
              this.usuarioConectado = this.auth.usuarioActual!;
              }

  // to do - Usar combineLatest para usaurios sin el nombre actual. Necesita 3 observables.
  // usuarios$ = this.userService.allUsers$;
    listadoDeUsuarios!: Array<Usuario>;
    usuarioConectado: Usuario;
    usuarioABuscar: string = "";
    usuarioSeleccionado?: Usuario;
    listadoMesajesAMostrar!: Array<Chat>;
    mensajeControl = new FormControl('');
    mostrarNombre: boolean = false;

    @ViewChild('endOfChat') endOfChat!: ElementRef;



    ngOnInit(): void {

        this.listadoDeUsuarios = this.userService.listadoUsuarios;

        console.log('chat', this.listadoDeUsuarios);
    }

    buscarUsuario(){

    }

    recibirUsuario($event: Usuario)
    {
        this.usuarioSeleccionado = $event;
        // this.listadoMesajesAMostrar = this.chatsConUsuarioSeleccionado(this.usuarioDeChatActivo);

        this.mostrarNombre = true;
        this.chatsConUsuarioSeleccionado();
        console.log('Usuario Clieckeado:', $event);
        console.log('Usr Conectado:', this.usuarioConectado);
        console.log('Listado de Mensajes a Mostrar',this.listadoMesajesAMostrar);
        console.log('Todos los Chats', this.chatService.listadoChats);
    }

    chatsConUsuarioSeleccionado() {
      this.listadoMesajesAMostrar = this.chatService.listadoChats
                .filter(chat =>
                  (chat.remitente.id === this.usuarioConectado.id &&
                  chat.destinatario.id === this.usuarioSeleccionado?.id) ||
                  (chat.remitente.id === this.usuarioSeleccionado?.id &&
                    chat.destinatario.id ===  this.usuarioConectado.id) );
    }


    enviarMensaje() {
      const message = this.mensajeControl.value;
      const selectedUser = this.usuarioSeleccionado!.id;


      if (message && selectedUser) {
        let fechaMensaje = new Date();
        let nuevoChat: Chat = {
          id: "",
          mensaje: message,
          fechaYHoraDate: fechaMensaje,
          fechaYHoraString: fechaMensaje.toLocaleString(),
          remitente: this.usuarioConectado,
          destinatario: this.usuarioSeleccionado!
        }

        this.chatService.nuevo(nuevoChat);

        this.mensajeControl.setValue('');
        this.scrollToBottom();
      }
    }

    scrollToBottom() {
      setTimeout(() => {
        if (this.endOfChat) {
          this.chatsConUsuarioSeleccionado();
          this.endOfChat.nativeElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
}
