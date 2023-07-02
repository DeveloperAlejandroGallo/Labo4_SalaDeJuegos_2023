import { HttpService } from "../services/http.service";
import { Juego } from "./juego";
import { Usuario } from "./user.interface";

export class JuegoAhorcado implements Juego{

  palabraBuscada!: string;
  intentos: number;
  gano: boolean;
  puntaje: number;
  nombre: string;
  fechaJugada: Date | undefined;
  jugador: Usuario;

  palabraMostrada!: Array<{letra: string, visible: boolean}>;
  palabraConGuiones!: Array<string>;

  letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
  '\u00D1', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  diccionario!: Array<string>;
  palabraJugador!: Array<string>;



  constructor(jugador: Usuario, palabra: string){
      this.nombre = "Ahorcado";
      this.palabraBuscada = palabra;
      this.intentos = 0;
      this.gano = false;
      this.puntaje = 0;

      this.jugador =jugador;

      console.log(`dicc 2: ${this.diccionario}`);

  }


  obtenerPalabraAlAzar(){


      this.palabraMostrada = new Array<{letra: string, visible: boolean}>();
      this.palabraConGuiones = new Array<string>();

      for (let i = 0; i < this.palabraBuscada.length; i++) {
          this.palabraMostrada[i] = {letra: this.palabraBuscada[i], visible: i === 0};
          if (this.palabraBuscada[i].toUpperCase() === 'Ñ') { // Muestro la primera
              this.palabraMostrada[i] = {letra: '\u00D1', visible: i === 0};
          }
      }
  }

  palabraMostradaString(): string {
      let palabra: string;
      for (let i = 0; i < this.palabraMostrada.length; i++) {
          this.palabraConGuiones[i] = '_';
          if (this.palabraMostrada[i].visible) {
              this.palabraConGuiones[i] = this.palabraMostrada[i].letra.toUpperCase();
          }
      }
      palabra = this.palabraConGuiones.join(',');
      console.log(`palabra con guiones: ${palabra}`);
      return palabra;
  }

  existeLetra(letra: string) {
      let ret: boolean = false;
      this.palabraMostrada.forEach(element => {
         if (element.letra.toUpperCase() === letra.toUpperCase()) {
          element.visible = true;
          ret = true;
         }
     });

     return ret;
  }

  public verificar(): boolean {
      this.gano = true;
      this.puntaje++;
      console.log('B: ' + this.palabraBuscada + '- M: ' + this.palabraMostradaString());
      for (let i = 0; i < this.palabraBuscada.length; i++)
      {
          if (this.palabraBuscada[i] !== this.palabraConGuiones[i]) {
              this.gano = false;
              this.puntaje--;
              break;
          }
      }
      this.registrarJugada(this.gano, this.puntaje);
      return this.gano;
  }

  public registrarJugada(resultado: boolean, puntaje: number) {
    this.gano = resultado;
    this.fechaJugada = new Date();
    this.puntaje = puntaje;
    console.info(`Por salvar el juego ${this}`);
  }




}
