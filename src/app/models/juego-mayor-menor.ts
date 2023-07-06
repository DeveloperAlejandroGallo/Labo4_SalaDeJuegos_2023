import { Carta, Mazo } from "./carta";
import { Juego } from "./juego";

export interface JuegoMayorMenor extends Juego {
    mazo: Mazo;

}
