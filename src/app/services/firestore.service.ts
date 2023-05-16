import { Injectable } from '@angular/core';
import { addDoc, collection, collectionChanges, collectionData, deleteDoc, doc, Firestore, getDoc, getDocs, setDoc, updateDoc } from '@angular/fire/firestore';
import { Usuario } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  colectionName='alguna';

  constructor(private firestore: Firestore) {
    this.coleccionUsuarios = collection(this.firestore, this.colectionName);
   }

  listado?: Array<any>;
  coleccionUsuarios = collection(this.firestore,this.colectionName);



//Genericos
  traer(){
    const coleccion = collection(this.firestore, this.colectionName);
    const observable = collectionData(coleccion);

    observable.subscribe((respuesta)=>{
      this.listado = respuesta;
    });
  }



  delete(id: string){
    const coleccion = collection(this.firestore, this.colectionName);
    const documento = doc(coleccion,id);
    deleteDoc(documento);
  }


//Usuario
  nuevo(usuario: Usuario) {

    const docuNuevo = doc(this.coleccionUsuarios);
    // addDoc(coleccion, objeto);
    const nuevoId = docuNuevo.id;

    setDoc(docuNuevo, {
      id: nuevoId,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      email: usuario.email,
      clave: usuario.clave,
      foto: usuario.foto,
    });
  }

  update(usuario: Usuario){
    const coleccion = collection(this.firestore, this.colectionName);
    const documento = doc(coleccion,usuario.id);
    updateDoc(documento,{
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      email: usuario.email,
      clave: usuario.clave,
      foto: usuario.foto,
    })
  }


}
