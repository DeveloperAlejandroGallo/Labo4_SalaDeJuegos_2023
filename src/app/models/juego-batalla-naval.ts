import { Juego } from "./juego";

export interface JuegoBatallaNaval  extends Juego{
  jugadas: Array<{coordenada: {x: number, y: number}, acerto: boolean}>;
}
