import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-var',
  templateUrl: './nav-var.component.html',
  styleUrls: ['./nav-var.component.scss']
})
export class NavVarComponent {


  usuarioConectado: Usuario | undefined | null;
  logueado: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.logueado = this.authService.sesionActiva;
    if (this.logueado) {
      this.usuarioConectado = this.authService.usuarioActual;
      this.logueado = this.authService.logueado();
    }



  }

  onload = () => { this.ngOnInit(); }

  irAHome() {
    this.router.navigate(['/juegos/home']);
  }

  cerrarSesion() {
    this.authService.cerrarSesion();
    this.usuarioConectado = this.authService.logInfo();
    setTimeout(() => {
      this.router.navigate(['login']);
    }, 1000);
  }

}
