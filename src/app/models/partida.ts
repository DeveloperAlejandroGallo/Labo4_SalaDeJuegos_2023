import { IJuegoAhorcado } from "./ijuego-ahorcado";
import { Juego } from "./juego";
import { JuegoBatallaNaval } from "./juego-batalla-naval";
import { JuegoMayorMenor } from "./juego-mayor-menor";
import { JuegoPasapalabra } from "./juego-pasapalabra";
import { JuegoPreguntados } from "./juego-preguntados";
import { Usuario } from "./user.interface";

export interface Partida {
  id: string;
  fecha: string;
  jugador: Usuario;
  juego: Juego | IJuegoAhorcado | JuegoBatallaNaval | JuegoMayorMenor | JuegoPreguntados | JuegoPasapalabra;
  gano: boolean;
  puntajeJugada: number;
  jugadas: Array<any>;
}
