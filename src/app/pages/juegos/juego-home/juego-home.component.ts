import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-juego-home',
  templateUrl: './juego-home.component.html',
  styleUrls: ['./juego-home.component.scss']
})
export class JuegoHomeComponent implements OnInit{


  constructor(private auth: AuthService) {

  }

    usuarioConectado?: Usuario;

    ngOnInit(): void {
      this.usuarioConectado = this.auth.logInfo();
      }
    }

