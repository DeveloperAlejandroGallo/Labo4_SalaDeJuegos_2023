import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Juegos } from 'src/app/enums/juegos';
import { IJuegoAhorcado } from 'src/app/models/ijuego-ahorcado';
import { JuegoAhorcado } from 'src/app/models/juego-ahorcado';
import { Partida } from 'src/app/models/partida';
import { Usuario } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { MensajesService } from 'src/app/services/mensajes.service';
import { PartidasService } from 'src/app/services/partidas.service';
import { ToastMsgService } from 'src/app/services/toast-msg.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.scss'],
})
export class AhorcadoComponent {
  constructor(
    private partidaService: PartidasService,
    private authService: AuthService,
    private msgSrv: ToastMsgService,
    private swalMsg: MensajesService,
    private router: Router
  ) {}

  juegoActivo: boolean = false;
  nuevoJuego!: JuegoAhorcado;
  palabraPantalla: Array<string> = [];
  letrasJugadas: Array<string> = [];
  errores: number = 0;
  Jugador!: Usuario;
  juegaDeNuevo:boolean = false;

  jugadas: Array<{ letra: string; acierto: boolean }> = [];
  ngOnInit(): void {
    this.nuevo();
  }

  letraClick(char: string) {
    console.log('click:' + char);

    if (!this.letrasJugadas.includes(char)) {
      let acierto: boolean = false;
      if (this.nuevoJuego.existeLetra(char.toUpperCase())) {
        this.nuevoJuego.palabraMostradaString();
        this.msgSrv.Exito('Buen trabajo!');
        acierto = true;
      } else {
        this.msgSrv.Error(`${char} no esta en la palabra`);
        this.cambiarImagen();
      }

      this.jugadas.push({ letra: char, acierto: acierto });
      this.letrasJugadas.push(char);
    } else {
      this.msgSrv.Warning('Esa letra ya fu\u00E9 jugada');
    }

    if (this.errores == 8) {
      this.nuevoJuego.gano = false;
      this.nuevoJuego.registrarJugada(false, 0);
      this.partidaService.nuevo(this.JuegoAPartida(this.nuevoJuego));

      Swal.fire({
        title: 'Partida Perdida :(',
        text: `La palabra era: ${
          this.nuevoJuego.palabraBuscada
        } y ud ingreso las letras ${this.letrasJugadas.join(', ')}`,
        icon: 'error',
      }).then(() => {
        Swal.fire({
          title: 'Desea jugar de nuevo?',
          showCancelButton: true,
          confirmButtonText: `Si`,
        }).then((result) => {
          if (result.isConfirmed) {
            this.juegaDeNuevo = true;
            this.nuevo();
          } else {
            this.router.navigate(['/juegos/home']);
          }
        });
      });
    } else if (this.nuevoJuego.verificar()) {
      this.nuevoJuego.registrarJugada(true, 8 - this.errores);
      this.partidaService.nuevo(this.JuegoAPartida(this.nuevoJuego));

      Swal.fire({
        title: `FELICITACIONES A GANADO LA PARTIDA!!! =D\n<b>Puntaje: ${8 - this.errores}</b>`,
        text: `La palabra era: ${
          this.nuevoJuego.palabraBuscada
        } y ud ingreso las letras ${this.letrasJugadas.join(', ')}`,
        icon: 'success',
      }).then(() => {
        Swal.fire({
          title: 'Desea jugar de nuevo?',
          showCancelButton: true,
          confirmButtonText: `Si`,
        }).then((result) => {
          if (result.isConfirmed) {
            this.juegaDeNuevo = true;
            this.nuevo();
          } else {
            this.router.navigate(['/juegos/home']);
          }
        });
      });
    }
  }
  JuegoAPartida(nuevoJuego: JuegoAhorcado): Partida {
    let juego: IJuegoAhorcado = {
      nombre: nuevoJuego.nombre,
      palabraSecreta: nuevoJuego.palabraBuscada,
    };

    return {
      id: '',
      fecha: new Date().toISOString(),
      jugador: this.authService.usuarioActual!,
      juego: juego,
      gano: nuevoJuego.gano,
      puntajeJugada: nuevoJuego.puntaje,
      jugadas: this.jugadas,
    };
  }

  cambiarImagen() {
    const celda = document.getElementById('ahorcado') as unknown as any;

    celda.classList.remove('img' + this.errores.toString());
    this.errores++;
    celda.classList.add('img' + this.errores.toString());
  }

  nuevo() {
    // this.palabraService.getPalabraAlAzar();

    const celda = document.getElementById('ahorcado') as unknown as any;

    this.nuevoJuego = new JuegoAhorcado(this.authService.usuarioActual!);
    this.nuevoJuego.palabraMostradaString();
    if(this.juegaDeNuevo){
      celda.classList.remove('img' + this.errores.toString());
      celda.classList.add('img0');
    }
    this.juegoActivo = true;
    this.errores = 0;
    this.letrasJugadas = new Array<string>();
  }
}
