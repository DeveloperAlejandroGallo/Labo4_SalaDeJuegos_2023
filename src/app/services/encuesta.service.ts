import { Injectable } from '@angular/core';
import { CollectionReference, DocumentData, Firestore, collection, deleteDoc, doc, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { Encuesta } from '../models/encuesta';
import { collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {

  colectionName: string = 'encuestas';
  coleccionRef: CollectionReference<DocumentData>;

  constructor(private firestore: Firestore) {
    this.coleccionRef = collection(this.firestore, this.colectionName);
  }

  listadoUsuarios!: Array<Encuesta>;

  //Genericos
  traer() {
    const coleccion = collection(this.firestore, this.colectionName);
    const observable = collectionData(coleccion);

    observable.subscribe((respuesta) => {
      this.listadoUsuarios = respuesta as Array<Encuesta>;
    });
  }

  delete(id: string) {
    const coleccion = collection(this.firestore, this.colectionName);
    const documento = doc(coleccion, id);
    deleteDoc(documento);
  }

  get allPartidas$(): Observable<Encuesta[]> {
    const coleccion = collection(this.firestore, this.colectionName);
    const queryAll = query(coleccion);
    return collectionData(queryAll) as Observable<Encuesta[]>;
  }

  getPartidasPorUsuario(encuestaId: string): Observable<Encuesta[]> {
    const queryPartidasPorUsuario = query(this.coleccionRef, where('id', '==', encuestaId));
    return collectionData(queryPartidasPorUsuario) as Observable<Encuesta[]>;
  }

  //Partida
  nuevo(encuesta: Encuesta) {
    const docuNuevo = doc(this.coleccionRef);
    // addDoc(coleccion, objeto);
    const nuevoId = docuNuevo.id;

    setDoc(docuNuevo, {
      id: nuevoId,
      fecha: encuesta.fecha,
      jugador: encuesta.jugador,

    });
  }

  update(encuesta: Encuesta) {
    const coleccion = collection(this.firestore, this.colectionName);
    const documento = doc(coleccion, encuesta.id);
    updateDoc(documento, {
      fecha: encuesta.fecha,
      jugador: encuesta.jugador,

    });
  }
}
