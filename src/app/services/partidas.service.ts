import { Injectable } from '@angular/core';
import {
  CollectionReference,
  DocumentData,
  Firestore,
  collection,
  collectionData,
  deleteDoc,
  doc,
  query,
  setDoc,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Partida } from '../models/partida';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PartidasService {
  colectionName: string = 'partidas';
  coleccionRef: CollectionReference<DocumentData>;

  constructor(private firestore: Firestore) {
    this.coleccionRef = collection(this.firestore, this.colectionName);
  }

  listadoUsuarios!: Array<Partida>;

  //Genericos
  traer() {
    const coleccion = collection(this.firestore, this.colectionName);
    const observable = collectionData(coleccion);

    observable.subscribe((respuesta) => {
      this.listadoUsuarios = respuesta as Array<Partida>;
    });
  }

  delete(id: string) {
    const coleccion = collection(this.firestore, this.colectionName);
    const documento = doc(coleccion, id);
    deleteDoc(documento);
  }

  get allPartidas$(): Observable<Partida[]> {
    const coleccion = collection(this.firestore, this.colectionName);
    const queryAll = query(coleccion);
    return collectionData(queryAll) as Observable<Partida[]>;
  }

  getPartidasPorUsuario(usuarioId: string): Observable<Partida[]> {
    const queryPartidasPorUsuario = query(this.coleccionRef, where('jugador.id', '==', usuarioId));
    return collectionData(queryPartidasPorUsuario) as Observable<Partida[]>;
  }

  //Partida
  nuevo(partida: Partida) {
    const docuNuevo = doc(this.coleccionRef);
    // addDoc(coleccion, objeto);
    const nuevoId = docuNuevo.id;

    setDoc(docuNuevo, {
      id: nuevoId,
      fecha: partida.fecha,
      jugador: partida.jugador,
      juego: partida.juego,
      gano: partida.gano,
      puntajeJugada: partida.puntajeJugada,
      partidas: partida.jugadas,
    });
  }

  update(partida: Partida) {
    const coleccion = collection(this.firestore, this.colectionName);
    const documento = doc(coleccion, partida.id);
    updateDoc(documento, {
      fecha: partida.fecha,
      jugador: partida.jugador,
      juego: partida.juego,
      gano: partida.gano,
      puntajeJugada: partida.puntajeJugada,
      partidas: partida.jugadas,
    });
  }
}
