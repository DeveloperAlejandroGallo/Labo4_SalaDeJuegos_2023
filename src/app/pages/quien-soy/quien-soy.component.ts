import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-quien-soy',
  templateUrl: './quien-soy.component.html',
  styleUrls: ['./quien-soy.component.scss']
})
export class QuienSoyComponent implements OnInit{

  constructor(private auth: AuthService) {}

  usuarioConectado?: Usuario;

  ngOnInit(): void {
    this.usuarioConectado = this.auth.logInfo();
    }


}
