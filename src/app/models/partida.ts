import { Juego } from "./juego";
import { JuegoAhorcado } from "./juego-ahorcado";
import { JuegoMayorMenor } from "./juego-mayor-menor";
import { Usuario } from "./user.interface";

export interface Partida {
  id: string;
  jugador: Usuario;
  juego: Juego | JuegoAhorcado | JuegoMayorMenor;
  gano: boolean;
  puntajeJugada: number;
}
