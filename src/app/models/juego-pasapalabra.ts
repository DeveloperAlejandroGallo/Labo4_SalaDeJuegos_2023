import { Juego } from "./juego";

export interface JuegoPasapalabra extends Juego {
}


export interface Pasapalabra  {
  id: number;
  letra:string;
  pregunta: string;
  jugada: boolean;
  respuesta: string;

}


const Pasapalabras: Array<Pasapalabra> = [

{id: 0,  letra: "A", jugada: false, pregunta: "Empieza por A: Persona que colecciona o negocia con antigüedades",  respuesta: "Anticuario",},
{id: 1,  letra: "B", jugada: false, pregunta: "Empieza por B: Utensilio para la lactancia artificial que consiste en una botella pequeña con una tetina de goma", respuesta: "Biberon",},
{id: 2,  letra: "C", jugada: false, pregunta: "Empieza por C: Jefe de la mafia, especialmente de narcotraficantes", respuesta: "Capo",},
{id: 3,  letra: "D", jugada: false, pregunta: "Empieza por D: Producto que se utiliza para suprimir el olor corporal o de algún recinto", respuesta: "Desodorante",},
{id: 4,  letra: "E", jugada: false, pregunta: "Empieza por E: Pasajero, de corta duración", respuesta: "Efimero",},
{id: 5,  letra: "F", jugada: false, pregunta: "Empieza por F: Prenda interior elástica que ciñe la cintura, o la cintura y las caderas", respuesta: "Faja",},
{id: 6,  letra: "G", jugada: false, pregunta: "Empieza por G: Golosina blanca masticable, generalmente recubierta de azúcar ", respuesta: "Gomita",},
{id: 7,  letra: "H", jugada: false, pregunta: "Empieza por H: Conjunto de todos los hechos ocurridos en tiempos pasados ", respuesta: "Historia",},
{id: 8,  letra: "I", jugada: false, pregunta: "Empieza por I: Apellido del político que fue presidente de Estonia entre los años 2006 y 2016", respuesta: "Ilves",},
{id: 9,  letra: "J", jugada: false, pregunta: "Empieza por J: Variedad de judía de vainas anchas y semilla grande", respuesta: "Judia",},
{id: 10, letra: "L", jugada: false, pregunta: "Empieza por L: Ascendencia o descendencia de una familia, especialmente noble", respuesta: "Linaje",},
{id: 11, letra: "M", jugada: false, pregunta: "Empieza por M: Cueva en la que habitan ciertos animales, especialmente los conejos", respuesta: "Madriguera",},
{id: 12, letra: "N", jugada: false, pregunta: "Empieza por N: Espinazo de los vertebrados", respuesta: "Nervio",},
{id: 13, letra: "Ñ", jugada: false, pregunta: "Contiene la Ñ: Hacer o fabricar moneda ", respuesta: "Acuñar",},
{id: 14, letra: "O", jugada: false, pregunta: "Empieza por O: Perteneciente o relativo a los sueños", respuesta: "Onirico",},
{id: 15, letra: "P", jugada: false, pregunta: "Empieza por P: Instrumento con forma de pico que utilizan los alpinistas para asegurar sus movimientos sobre la nieve o el hielo", respuesta: "Piolet",},
{id: 16, letra: "Q", jugada: false, pregunta: "Contiene la Q: Triángulo que tiene todos sus lados iguales ", respuesta: "Equilatero",},
{id: 17, letra: "R", jugada: false, pregunta: "Empieza por R: Departamento de Colombia con capital en la ciudad de Pereira", respuesta: "Risaralda",},
{id: 18, letra: "S", jugada: false, pregunta: "Empieza por S: Poner o colocar a alguien en una silla o banco, de manera que quede apoyado y descansando sobre las nalgas", respuesta: "Sentar",},
{id: 19, letra: "T", jugada: false, pregunta: "Empieza por T:  Tienda de piel de forma cónica que utilizaban como vivienda los indios de las praderas de América del Norte", respuesta: "Tipi",},
{id: 20, letra: "U", jugada: false, pregunta: "Empieza por U: Que se refiere o se circunscribe solamente a una parte o a un aspecto de algo", respuesta: "Unilateral",},
{id: 21, letra: "V", jugada: false, pregunta: "Empieza por V: Flor del cardo", respuesta: "Violeta",},
{id: 22, letra: "X", jugada: false, pregunta: "Contiene la X: En las repúblicas de Venecia o Génova, príncipe o magistrado supremo", respuesta: "Dux",},
{id: 23, letra: "Y", jugada: false, pregunta: "Contiene la Y: Preparar el montaje y ejecución de un espectáculo antes de ofrecerlo al público", respuesta: "Ensayar",},
{id: 24, letra: "Z", jugada: false, pregunta: "Empieza por Z: Participio del verbo zumbar", respuesta: "Zumbado"}
];

export default Pasapalabras;
