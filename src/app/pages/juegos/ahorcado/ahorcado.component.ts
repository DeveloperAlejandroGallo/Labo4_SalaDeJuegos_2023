import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JuegoAhorcado } from 'src/app/models/juego-ahorcado';
import { Usuario } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { JuegosService } from 'src/app/services/juegos.service';


@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.scss']
})
export class AhorcadoComponent {
  constructor(private juegosService: JuegosService,
              private router: Router,
              private palabraService: HttpService,
              private authService: AuthService) { }

  juegoActivo: boolean = false;
  nuevoJuego!: JuegoAhorcado;
  palabraPantalla: Array<string> = [];
  letrasJugadas: Array<string> = [];
  mensaje: string = "";
  errores: number = 0;
  Jugador!: Usuario;

  ngOnInit(): void {
    this.nuevo();
  }

  letraClick(char: string) {
    console.log('click:'+char);
    if (!this.letrasJugadas.includes(char)) {
      if (this.nuevoJuego.existeLetra(char.toUpperCase())) {
        this.mensaje = 'Buen trabajo!';
      } else {
        this.mensaje = ':( ser\u00E1 la pr\u00F3xima';
        this.cambiarImagen();
      }
      this.letrasJugadas.push(char);
    } else {
      this.mensaje = 'Esa letra ya fu\u00E9 jugada';
    }
    if (this.errores == 9)
    {
      this.mensaje = 'AH PERDIDO EL JUEGO...';
      this.nuevoJuego.gano = false;
      this.nuevoJuego.registrarJugada(false, 0);
      this.juegosService.save(this.nuevoJuego);
    } else {
      if (this.nuevoJuego.verificar()) {
        this.nuevoJuego.registrarJugada(true, 1);
        this.juegosService.save(this.nuevoJuego);
        this.mensaje = 'FELICITACIONES AH GANADO EL JUEGO!';
      }
    }
  }

  cambiarImagen() {
    const celda = document.getElementById('ahorcado') as unknown as any;

    celda.classList.remove('img' + this.errores.toString());
    this.errores++;
    celda.classList.add('img' + this.errores.toString());
  }

  nuevo() {
    this.palabraService.getPalabraAlAzar();
    this.nuevoJuego = new JuegoAhorcado(this.authService.usuarioActual!, this.palabraService.palabra);
    this.nuevoJuego.palabraBuscada = this.palabraService.palabra.toUpperCase();
    setInterval(() => {
     this.nuevoJuego.palabraMostradaString();
     this.nuevoJuego.verificar();
    },500);
    this.juegoActivo = true;
    this.errores = 0;
    this.letrasJugadas = new Array<string>();
  }
}
