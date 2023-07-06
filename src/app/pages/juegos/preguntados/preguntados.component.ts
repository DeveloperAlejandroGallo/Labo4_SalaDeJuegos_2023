import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categorias } from 'src/app/enums/categorias';
import { Juegos } from 'src/app/enums/juegos';
import Trivias, { JuegoPreguntados, Pregunta } from 'src/app/models/juego-preguntados';
import { Partida } from 'src/app/models/partida';
import { AuthService } from 'src/app/services/auth.service';
import { PartidasService } from 'src/app/services/partidas.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.scss'],
})
export class PreguntadosComponent implements OnInit {
  imagen_categoria: string = '';
  preguntaActual!: Pregunta;
  preguntasRestantes: number = 10;
  jugadas: Array<{ pregunta: Pregunta; acierto: boolean }> = [];
  puntaje: number = 0;

  categorias = {
    [Categorias.Arte]: { imagen: "../../../../assets/Preguntados/Arte.webp"},
    [Categorias.Ciencia]: { imagen: "../../../../assets/Preguntados/Ciencia.webp"},
    [Categorias.Deporte]: { imagen: "../../../../assets/Preguntados/Deportes.webp"},
    [Categorias.Entretenimiento]: { imagen: "../../../../assets/Preguntados/Entretenimiento.webp"},
    [Categorias.Geografia]: { imagen: "../../../../assets/Preguntados/Geografia.jpg"},
    [Categorias.Historia]: { imagen: "../../../../assets/Preguntados/Historia.webp"},
   } ;

  constructor(private authSrv: AuthService,
              private partidasSrv: PartidasService,
              private router: Router) {}

  ngOnInit(): void {
    this.NuevoJuego();
  }

  NuevoJuego() {

    Trivias.forEach((t)=>{t.jugada = false;});

    this.preguntasRestantes = 10;
    this.puntaje = 0;
    this.jugadas = [];

    this.SiguientePregunta(Trivias);

  }

  SiguientePregunta(preguntas: Array<Pregunta>) {
    let indicePregunta = Math.floor(Math.random() * preguntas.length);
    this.preguntaActual = preguntas[indicePregunta];
    this.imagen_categoria = this.categorias[this.preguntaActual.categoria].imagen;
    this.preguntasRestantes--;
  }

  Responder(i: number){
    let acierto = this.preguntaActual.respuestas[i].correcta;


    if(acierto){
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Correcto!!!',
        showConfirmButton: false,
        timer: 1500
      })

      this.puntaje += 100;


    }
    else{
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Incorrecto!!! (O_O)',
        text: 'Mas suerte la próxima :(',
        showConfirmButton: false,
        timer: 1500
      })
    }
    Trivias[this.preguntaActual.id].jugada = true;
    this.jugadas.push({pregunta: this.preguntaActual, acierto: true});
    this.NuevaPregunta();


  }




  NuevaPregunta() {
    let preguntas: Array<Pregunta> = Trivias.filter((t)=>{!t.jugada});
    // console.log(Trivias);


    Trivias.forEach((t)=>{
      if(!t.jugada){
        preguntas.push(t);
      }

    });

    // console.log(preguntas);
    if(this.preguntasRestantes == 0){
      this.finalizarJuego();
      return;
    }

    this.SiguientePregunta(preguntas);
  }



  finalizarJuego() {
    let juego: JuegoPreguntados = {
      nombre: Juegos.Preguntados,
    };

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



}// class
