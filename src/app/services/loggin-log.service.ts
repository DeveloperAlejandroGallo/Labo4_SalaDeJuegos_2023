import { Injectable } from '@angular/core';
import { addDoc, collection, collectionChanges, collectionData, deleteDoc, doc, Firestore, getDoc, getDocs, setDoc, updateDoc } from '@angular/fire/firestore';
import { Usuario } from '../models/user.interface';
import { ToastMsgService } from './toast-msg.service';

@Injectable({
  providedIn: 'root'
})
export class LogginLogService {

  colectionName='logginlog';

  constructor(private firestore: Firestore,
                      private toastMsg: ToastMsgService) {

    this.coleccion = collection(this.firestore, this.colectionName);
   }

  listado?: Array<any>;
  coleccion = collection(this.firestore, this.colectionName);



//Genericos
  traer(){
    const coleccion = collection(this.firestore, this.colectionName);
    const observable = collectionData(coleccion);

    observable.subscribe((respuesta)=>{
      this.listado = respuesta;
    });
  }


  nuevo(email: string) {

    const docuNuevo = doc(this.coleccion);
    const nuevoId = docuNuevo.id;

    let fecha = new Date();
    try{
      setDoc(docuNuevo, {
        id: nuevoId,
        email: email,
        fechaIngreso: fecha.toLocaleString(),
      });
    }catch(e){
      console.log((e as Error).message);
      this.toastMsg.Error((e as Error).message);
    }

  }


}


