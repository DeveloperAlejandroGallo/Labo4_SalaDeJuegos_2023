import { Injectable } from '@angular/core';
import { Juego } from '../models/juego';
import { CollectionReference, DocumentData, Firestore, collection, deleteDoc, doc, query, setDoc, updateDoc } from 'firebase/firestore';
import { JuegoAhorcado } from '../models/juego-ahorcado';
import { JuegoBatallaNaval } from '../models/juego-batalla-naval';
import { JuegoMayorMenor } from '../models/juego-mayor-menor';
import { JuegoPreguntados } from '../models/juego-preguntados';
import { collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class JuegosService {

  colectionName: string = 'juegos';
  coleccionRef: CollectionReference<DocumentData>;

  constructor(private firestore: Firestore) {
    this.coleccionRef = collection(this.firestore, this.colectionName);
   }

  listadoJuegos!: Array<Juego | JuegoAhorcado | JuegoBatallaNaval | JuegoMayorMenor | JuegoPreguntados  >;


//Genericos
  traer(){
    const coleccion = collection(this.firestore, this.colectionName);
    const observable = collectionData(coleccion);

    observable.subscribe((respuesta)=>{
      this.listadoJuegos = respuesta as Array<Juego | JuegoAhorcado | JuegoBatallaNaval | JuegoMayorMenor | JuegoPreguntados   >;
    });
  }



  delete(id: string){
    const coleccion = collection(this.firestore, this.colectionName);
    const documento = doc(coleccion,id);
    deleteDoc(documento);
  }



  get allUsers$(): Observable<Juego | JuegoAhorcado | JuegoBatallaNaval | JuegoMayorMenor | JuegoPreguntados  []>{
    const coleccion = collection(this.firestore, this.colectionName);
    const queryAll = query(coleccion);
    return collectionData(queryAll) as Observable<Juego | JuegoAhorcado | JuegoBatallaNaval | JuegoMayorMenor | JuegoPreguntados  []>;
  }


//Juego
  nuevo(juego: Juego | JuegoAhorcado | JuegoBatallaNaval | JuegoMayorMenor | JuegoPreguntados  ) {

    const docuNuevo = doc(this.coleccionRef);
    // addDoc(coleccion, objeto);
    const nuevoId = docuNuevo.id;

    setDoc(docuNuevo, {
      id: nuevoId,
      nombre: juego.nombre,
      puntaje: juego.puntaje,
      gano: juego.gano,
      partidas: (juego as JuegoAhorcado | JuegoBatallaNaval | JuegoMayorMenor | JuegoPreguntados  ).jugadas,
    });
  }

  update(juego: Juego | JuegoAhorcado | JuegoBatallaNaval | JuegoMayorMenor | JuegoPreguntados  ){
    const coleccion = collection(this.firestore, this.colectionName);
    const documento = doc(coleccion,juego.id);
    updateDoc(documento,{
      nombre: juego.nombre,

    })
  }

}
