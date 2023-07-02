import { Injectable } from '@angular/core';
import { addDoc, collection, collectionChanges, collectionData, CollectionReference, deleteDoc, doc, DocumentData, Firestore, getDoc, getDocs, query, setDoc, updateDoc } from '@angular/fire/firestore';
import { Usuario } from '../models/user.interface';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  colectionName: string = 'usuarios';
  coleccionUsuarios: CollectionReference<DocumentData>;

  constructor(private firestore: Firestore) {
    this.coleccionUsuarios = collection(this.firestore, this.colectionName);
   }

  listadoUsuarios!: Array<Usuario>;


//Genericos
  traer(){
    const coleccion = collection(this.firestore, this.colectionName);
    const observable = collectionData(coleccion);

    observable.subscribe((respuesta)=>{
      this.listadoUsuarios = respuesta as Array<Usuario>;
    });
  }



  delete(id: string){
    const coleccion = collection(this.firestore, this.colectionName);
    const documento = doc(coleccion,id);
    deleteDoc(documento);
  }

  get allUsers$(): Observable<Usuario[]>{
    const coleccion = collection(this.firestore, this.colectionName);
    const queryAll = query(coleccion);
    return collectionData(queryAll) as Observable<Usuario[]>;
  }

  // get currentUserProfile$(): Observable<UserProfile | null>{
  //   return this.auth.currentUser$.pipe(
  //     switchMap((user)=>{
  //       if(!user?.uid)
  //     })
  //   );
  // }
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
      logueado: false,
      usuario: usuario.usuario,
      esAdmin: usuario.esAdmin,
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
      logueado: usuario.logueado,
      usuario: usuario.usuario,
      esAdmin: usuario.esAdmin,
    })
  }

  existeUsuario(email: string): boolean{
    let usrBuscado = this.listadoUsuarios?.find(x=>x.email == email);
    return usrBuscado != undefined ? true : false ;
  }
}
