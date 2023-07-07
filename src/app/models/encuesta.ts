import { Juegos } from "../enums/juegos";
import { Usuario } from "./user.interface";

export interface Encuesta {
  id: string;
  jugador: Usuario;
  fecha: string;
  JuegosJugados: Array<{juego: Juegos; jugado: boolean}>;
  nombre: string;
  apellido: string;
  edad: number;
  telefono: string;
  preguntas1: string;
  respuesta1: number;
  pregunta2: string;
  respuesta2: [boolean, boolean, boolean, boolean];
  pregunta3: string;
  respuesta3: string;
}


export interface EncuestaPregunta {
  pregunta: string;
  respuesta: any;
}

const preguntas: Array<EncuestaPregunta> = [
  {pregunta: "¿Que le parecio la aplicaion del 1 al 5?", respuesta: 0},
  {pregunta: "¿Que Juegos ha Jugado?", respuesta: {}},

]
