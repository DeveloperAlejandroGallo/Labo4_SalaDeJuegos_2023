import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit{

  constructor(private auth: AuthService) {}

  usuarioConectado?: Usuario;

  ngOnInit(): void {
    this.usuarioConectado = this.auth.logInfo();
    }
}
