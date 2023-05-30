import { Injectable } from '@angular/core';
import { addDoc, collection, collectionChanges, collectionData, CollectionReference, deleteDoc, doc, DocumentData, Firestore, getDoc, getDocs, orderBy, query, setDoc, updateDoc } from '@angular/fire/firestore';
import { Usuario } from '../models/user.interface';
import { Observable, switchMap } from 'rxjs';
import { Chat } from '../models/chat';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  colectionName: string = 'chats';
  collection: CollectionReference<DocumentData>;

  constructor(private firestore: Firestore) {
    this.collection = collection(this.firestore, this.colectionName);
   }

  listadoChats!: Array<Chat>;

//Genericos
  traer(){
    const coleccion = collection(this.firestore, this.colectionName);
    const queryAll = query(coleccion, orderBy('fechaYHoraDate', 'asc'));
    const observable = collectionData(queryAll);

    observable.subscribe((respuesta)=>{
      this.listadoChats = respuesta as Array<Chat>;
    });
  }



  delete(id: string){
    const coleccion = collection(this.firestore, this.colectionName);
    const documento = doc(coleccion,id);
    deleteDoc(documento);
  }

  get allChats$(): Observable<Chat[]>{
    const coleccion = collection(this.firestore, this.colectionName);
    const queryAll = query(coleccion);
    return collectionData(queryAll) as Observable<Chat[]>;
  }

  // get currentUserProfile$(): Observable<UserProfile | null>{
  //   return this.auth.currentUser$.pipe(
  //     switchMap((user)=>{
  //       if(!user?.uid)
  //     })
  //   );
  // }
//Usuario
  nuevo(chat: Chat) {

    const docuNuevo = doc(this.collection);
    // addDoc(coleccion, objeto);
    const nuevoId = docuNuevo.id;

    let fechaMensaje = new Date();
    setDoc(docuNuevo, {
      id: nuevoId,
      mensaje: chat.mensaje,
      fechaYHoraDate: fechaMensaje,
      fechaYHoraString: fechaMensaje.toLocaleString(),
      remitente: chat.remitente,
      destinatario: chat.destinatario
    });

  }

  // update(chat: Chat){
  //   const coleccion = collection(this.firestore, this.colectionName);
  //   const documento = doc(coleccion,chat.id);
  //   updateDoc(documento,{
  //     mensaje: chat.mensaje,
  //     fechaYHora: chat.fechaYHora,
  //     remitente: chat.remitente,
  //     destinatario: chat.destinatario
  //   })
  // }
}
