import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Juegos } from 'src/app/enums/juegos';
import { Carta, Mazo } from 'src/app/models/carta';
import { JuegoMayorMenor } from 'src/app/models/juego-mayor-menor';
import { Partida } from 'src/app/models/partida';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { MensajesService } from 'src/app/services/mensajes.service';
import { PartidasService } from 'src/app/services/partidas.service';
import { ToastMsgService } from 'src/app/services/toast-msg.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mayor-menor',
  templateUrl: './mayor-menor.component.html',
  styleUrls: ['./mayor-menor.component.scss'],
})
export class MayorMenorComponent implements OnInit {
  constructor(private httpSrv: HttpService,
              private router: Router,
              private partidasSrv: PartidasService,
              private authSrv: AuthService,
              private msgSrv: MensajesService,
              private toastMsgSrv: ToastMsgService,
              private elementRef: ElementRef) {}


  carta!: Carta;
  mazo!: Mazo;
  puntaje: number = 0;
  jugadas: Array<{cartaActual: Carta, jugada: string, cartaNueva: Carta, acierto: boolean}> = [];
  imagenCarta: string =  "../../../../assets/MayorMenor/joker.jpg";
  rachaDe3: number = 0;
  cartasRestantes: number = 0;

  ngOnInit(): void {
    this.NuevoJuego();
  }

  Jugada(signo: string) {
    const botonMayor = this.elementRef.nativeElement.querySelector('#botonMayor');
    const botonIgual = this.elementRef.nativeElement.querySelector('#botonIgual');
    const botonMenor = this.elementRef.nativeElement.querySelector('#botonMenor');

    botonMayor.disabled = true;
    botonIgual.disabled = true;
    botonMenor.disabled = true;

    this.httpSrv.getNuevaCartaDeMazo(this.mazo.deck_id).then((carta) => {
      let nuevaCarta: Carta = carta;
      let valorNuevaCarta: number = this.valorCarta(nuevaCarta);
      let valorCarta: number = this.valorCarta(this.carta);
      let acerto: boolean = false;

      this.imagenCarta = nuevaCarta.cards[0].image;
      this.cartasRestantes = nuevaCarta.remaining;

      switch (signo) {
        case '>':
          acerto = valorNuevaCarta > valorCarta;
          break;
        case '<':
          acerto = valorNuevaCarta < valorCarta;
          break;
        case '=':
          acerto = valorNuevaCarta == valorCarta;
          break;
      }

      if(acerto)
      {
        this.rachaDe3++;
        if(signo == '='){
          this.puntaje++;
          this.toastMsgSrv.Exito(`El = vale doble!! +2 Puntos`);
        }else
          this.toastMsgSrv.Exito(`Acertaste! +1 Punto`);

        this.puntaje++;

        if(this.rachaDe3 ==3)
        {
          this.toastMsgSrv.Exito(`Racha de 3! +2 Puntos`);
          this.puntaje += 2;
          this.rachaDe3 = 0;
        }

      }else{
        this.rachaDe3 = 0;
        if(this.puntaje > 0)
          this.puntaje--;

        this.toastMsgSrv.Error(`Mas suerte la próxima! -1 Punto`);
      }
      console.log("JUGADA: ", {cartaActual: this.carta, jugada: signo, cartaNueva: nuevaCarta, acierto: acerto});
      this.jugadas.push({cartaActual: this.carta, jugada: signo, cartaNueva: nuevaCarta, acierto: acerto});

      if(nuevaCarta.remaining == 0)
      {
        this.finalizarPartida();
      }
      this.carta = nuevaCarta;

      botonMayor.disabled = false;
      botonIgual.disabled = false;
      botonMenor.disabled = false;
    });
  }

  finalizarPartida() {


    let juego: JuegoMayorMenor = {
      nombre: Juegos.MayorMenor,
      mazo: this.mazo,
    }

    let partida: Partida = {
      id: '',
      fecha: new Date().toISOString(),
      jugador: this.authSrv.usuarioActual!,
      juego: juego,
      gano: this.puntaje > 0,
      puntajeJugada: this.puntaje,
      jugadas: this.jugadas,
    };

    this.partidasSrv.nuevo(partida);

    Swal.fire({
      title: `Fin del Juego!!!\n<b>Puntaje: ${this.puntaje}</b>`,
      icon: this.puntaje > 0 ? 'success':'error',
    }).then(() => {
      Swal.fire({
        title: 'Desea jugar de nuevo?',
        showCancelButton: true,
        confirmButtonText: `Si`,
      }).then((result) => {
        if (result.isConfirmed) {
          this.NuevoJuego();
        } else {
          this.router.navigate(['/juegos/home']);
        }
      });
    });
  }

  NuevoJuego() {
    this.httpSrv.getMazoDeCartas().then((mazo) => {
      this.mazo = mazo;
      console.log(this.mazo);
      this.httpSrv.getNuevaCartaDeMazo(this.mazo.deck_id).then((carta) => {
        this.carta = carta;
        this.imagenCarta = carta.cards[0].image;
        this.cartasRestantes = carta.remaining;
        this.puntaje = 0;
        this.jugadas = [];
        this.rachaDe3 = 0;
      });

    }).catch((error) => {
      console.error('Error al obtener el mazo de cartas: ' + error);
    });
  }


  valorCarta(carta: Carta): number {
    switch (carta.cards[0].value) {
      case 'JACK':
        return 11;
      case 'QUEEN':
        return 12;
      case 'KING':
        return 13;
      case 'ACE':
        return 14;
      default:
        return parseInt(carta.cards[0].value);
    }
  }
}
