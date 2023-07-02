import { Carta } from "./carta";
import { Juego } from "./juego";

export interface JuegoMayorMenor extends Juego {
    mazo: string;
    jugadas: Array<{carta: Carta, acertoMayorMenor: boolean}>;
}
