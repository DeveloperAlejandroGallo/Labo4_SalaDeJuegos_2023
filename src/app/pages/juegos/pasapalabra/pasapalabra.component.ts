import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Juegos } from 'src/app/enums/juegos';
import { Juego } from 'src/app/models/juego';
import Pasapalabras, { JuegoPasapalabra, Pasapalabra } from 'src/app/models/juego-pasapalabra';
import { Partida } from 'src/app/models/partida';
import { AuthService } from 'src/app/services/auth.service';
import { PartidasService } from 'src/app/services/partidas.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-pasapalabra',
  templateUrl: './pasapalabra.component.html',
  styleUrls: ['./pasapalabra.component.scss']
})
export class PasapalabraComponent implements OnInit{


  tiempoRestante: number = 30;
  preguntaActual!: Pasapalabra;
  respuesta: string = '';
  jugadas: Array<{ pregunta: Pasapalabra; acierto: boolean }> = [];
  contadorInterval: any;
  pregunta: string = '';

  constructor(private elementRef: ElementRef,
              private authSrv: AuthService,
              private partidasSrv: PartidasService,
              private router: Router) {

  }

  ngOnInit(): void {
    this.NuevoJuego();
  }

  NuevoJuego() {
    clearInterval(this.contadorInterval);
    Pasapalabras.forEach((t)=>{
      t.jugada = false;
      const botonLetra = this.elementRef.nativeElement.querySelector(`#letra-${t.letra}`);
      botonLetra.classList.remove('seleccionada');
      botonLetra.classList.remove('correcta');
      botonLetra.classList.remove('incorrecta');
      botonLetra.disabled = false;
    });

    this.jugadas = [];
    this.tiempoRestante = 30;
    this.respuesta = '';
    this.pregunta = '';

    this.inhabilitarBotones(true);

  }

  JugarLetra(letra: string) {
    this.respuesta = '';
    const botonLetra = this.elementRef.nativeElement.querySelector(`#letra-${letra}`);
    clearInterval(this.contadorInterval);

    this.inhabilitarBotones(false);
    botonLetra.classList.add('seleccionada');
    this.preguntaActual = Pasapalabras.find((p) => p.letra === letra)!;
    console.log(this.preguntaActual);
    this.pregunta = this.preguntaActual.pregunta;
    // Iniciar el contador de tiempo
    this.contadorInterval = setInterval(() => {
      this.tiempoRestante--;

      // if(this.tiempoRestante == 10){
      //   Swal.fire({
      //     position: 'top-end',
      //     icon: 'warning',
      //     title: 'Quedan 10 segundos!',
      //     showConfirmButton: false,
      //     timer: 750
      //   })
      // }

      if (this.tiempoRestante === 0 ) {
        clearInterval(this.contadorInterval);
        this.finalizarJuego();
      }

    }, 1000);

  }


  Responder(){



    if(this.respuesta == ''){
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Debe ingresar una respuesta',
        showConfirmButton: false,
        timer: 1000
      })
      return;
    }

    clearInterval(this.contadorInterval);
    this.inhabilitarBotones(true);

    const botonLetra = this.elementRef.nativeElement.querySelector(`#letra-${this.preguntaActual.letra}`);
    this.preguntaActual.jugada = true;
    Pasapalabras[this.preguntaActual.id].jugada = true;


    if(this.preguntaActual.respuesta.toLocaleLowerCase() == this.respuesta.toLocaleLowerCase()){
      botonLetra.classList.add('correcta');
      this.tiempoRestante += 10;
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Correcto!!!',
        text: `Sumaste 10 segundos`,
        showConfirmButton: false,
        timer: 1000
      })
    }
    else{
      botonLetra.classList.add('incorrecta');
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Incorrecto!!! (O_O)',
        text: 'Mas suerte la próxima :(',
        showConfirmButton: false,
        timer: 1000
      })
    }
    botonLetra.disabled = true;
    this.jugadas.push({pregunta: this.preguntaActual, acierto: this.preguntaActual.respuesta.toLocaleLowerCase() == this.respuesta.toLocaleLowerCase()});
    this.respuesta = '';
    this.pregunta = '';


    let hayQueFinalizar: boolean = true;
    Pasapalabras.forEach((t)=>{
      if(!t.jugada){
        hayQueFinalizar = false;
        return;
      }
    });

    if(hayQueFinalizar)
    {
      this.finalizarJuego();
    }

  }

  Pasapalabra(){
    clearInterval(this.contadorInterval);
    const botonLetra = this.elementRef.nativeElement.querySelector(`#letra-${this.preguntaActual.letra}`);
    botonLetra.classList.remove('seleccionada');

    this.inhabilitarBotones(true);
  }

  inhabilitarBotones(inhabilitar: boolean) {
    const botonResponder = this.elementRef.nativeElement.querySelector(`#pasapalabra`);
    const botonRespuesta = this.elementRef.nativeElement.querySelector(`#responder`);

    botonResponder.disabled = inhabilitar;
    botonRespuesta.disabled = inhabilitar;
  }




  finalizarJuego() {


    let cantPreguntasOK = this.jugadas.filter((j) => j.acierto).length;

    let juego: Juego = {
      nombre: Juegos.Pasapalabra,
    };

    let partida: Partida = {
      id: '',
      fecha: new Date().toISOString(),
      jugador: this.authSrv.usuarioActual!,
      juego: juego,
      gano: this.tiempoRestante > 0,
      puntajeJugada: cantPreguntasOK  * (this.tiempoRestante  * 10),
      jugadas: this.jugadas,
    };

    this.partidasSrv.nuevo(partida);

    Swal.fire({
      title: `Fin del Juego!!!\n<b>Puntaje: ${cantPreguntasOK  * (this.tiempoRestante  * 10)}</b>`,
      icon: this.tiempoRestante > 0 ? 'success':'error',
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


  capturarEnter(event: KeyboardEvent) {
    if (event.key === "Enter") {
      this.Responder();
    }
  }

} // Fin de la clase
