import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit{

  constructor(private auth: AuthService) {}

  usuarioConectado?: Usuario;

  ngOnInit(): void {
    this.usuarioConectado = this.auth.logInfo();
    }
}
