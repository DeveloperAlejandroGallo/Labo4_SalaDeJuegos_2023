import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{


constructor(private auth: AuthService) {

}

  usuarioConectado?: Usuario;

  ngOnInit(): void {
    this.usuarioConectado = this.auth.logInfo();
    }
  }




