import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './services/usuario.service';
import { ChatService } from './services/chat.service';
import { PartidasService } from './services/partidas.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Labo4_SalaDeJuegos_2023';

  constructor(private usuariosServices: UsuarioService,
              private chatServices: ChatService,
              private partidasSrv: PartidasService){}

  ngOnInit(): void {
    this.usuariosServices.traer(); //me suscribo a la lista de usuarios
    this.chatServices.traer();
    this.partidasSrv.traer();
  }

}
