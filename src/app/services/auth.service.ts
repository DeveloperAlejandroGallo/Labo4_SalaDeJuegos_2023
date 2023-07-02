import { Injectable } from '@angular/core';
import { getAuth, sendEmailVerification,createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User, onAuthStateChanged  } from "firebase/auth";
import { UsuarioService } from './usuario.service';
import { Router } from '@angular/router';
import { Constantes } from '../models/constantes';
import { Usuario } from '../models/user.interface';
import { ToastMsgService } from './toast-msg.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  sesionActiva: boolean = false;
  redirectUrl?: string;
  public usuarioActual?: Usuario;

  constructor(private usrService: UsuarioService,
              private message: ToastMsgService,
              private router: Router) { }




  public iniciarSesion(email:string, password: string) {

    let i: number = 0;
    const auth = getAuth();

    if(!this.usrService.existeUsuario(email)){
      this.message.Info("El usuario no existe en la base. Por favor registrese.");
      return;
    }

    this.usuarioActual = this.usrService.listadoUsuarios?.find(x => x.email == email)!;


    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in

        if(!userCredential.user.emailVerified){
          this.message.Warning("Antes de intentar ingresar debe validar su email");
          this.cerrarSesion();
          return;
        }


        this.loguear(this.usuarioActual!);

        // this.logSrv.registrarIngreso(this.usuarioActual!);
        this.router.navigate(['/home']);


    })
    .catch((error) => {
      let msg: string="";
      switch (error.code) {
        case 'auth/invalid-email':
          msg = 'Correo con formato incorrecto';
          break;
        case 'auth/wrong-password':
          msg = 'Clave incorrecta';
          break;
        case 'auth/user-not-found':
          msg = 'El usuario no existe.';
          // this.register();
          break;
        default:
          msg = error.message;
      }
      this.message.Error(`Usuario: ${email} - ${msg}`);
    });
  }


  loguear(usr: any) {
    this.sesionActiva = true;
    localStorage.setItem(Constantes.usuarioLocalStorage, JSON.stringify(usr));
    //Registro el ingreso:
      this.message.Info("Bienvenido " + usr.nombre);


  }

  public registrarCuenta(user: Usuario ) {


    const auth = getAuth();

    createUserWithEmailAndPassword(auth, user.email, user.clave)
    .then((userCredential) => {
      //Lo guardo en la coleccion:
      this.usrService.nuevo(user);

      sendEmailVerification(auth.currentUser!);
      this.message.Exito(`Usuario ${user.email} registrado correctamente.`);
      this.router.navigate(['/login']);

    })
    .catch((error) => {
      let msg: string = "";
      switch (error.code) {
        case 'auth/weak-password':
          msg = 'La clave debe poseer al menos 6 caracteres';
          break;
        case 'auth/email-already-in-use':
          msg = 'Correo ya registrado';
          break;
        case 'auth/invalid-email':
          msg = 'Correo con formato inv\u00E1lido';
          break;
        case 'auth/argument-error':
          if (error.message == 'createUserWithEmailAndPassword failed: First argument "email" must be a valid string.')
            msg = 'Correo con debe ser una cadena v\u00E1lida';
          else
            msg = 'La constrase\u00F1a debe ser una cadena v\u00E1lida';
          break;
        case 'auth/argument-error':
          msg = 'Correo con debe ser una cadena v\u00E1lida';
          break;
        default:
          msg = 'Error en registro';
      }
      this.message.Error(`Usuario: ${user.email} - ${msg}`);
      throw error;
    });
  }



  public cerrarSesion() {

    const auth = getAuth();

    signOut(auth).then(() => {
      localStorage.removeItem(Constantes.usuarioLocalStorage);
      this.router.navigate(['/login']);
    }).catch((error) => {
      // An error happened.
    });
  }

  public currentUser() {

    const usr = localStorage.getItem(Constantes.usuarioLocalStorage);

    return usr ? JSON.parse(usr) : null;
  }

  public logueado() {
    const auth = getAuth();

    return (auth.currentUser != null) && ((this.currentUser() as Usuario).email == auth.currentUser.email);


  }

  public logInfo():Usuario | undefined{
    let user: Usuario | undefined;
    const auth = getAuth();
    if(auth.currentUser){
      this.usuarioActual = this.usrService.listadoUsuarios?.find(x => x.email == auth.currentUser!.email);
      if(this.usuarioActual)
      {
        user = this.usuarioActual;
      }
    }
    return user;
  }

  traeUsuarioLogueado() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        this.usuarioActual = this.usrService.listadoUsuarios?.find(x => x.email == user.email);
        this.sesionActiva = true;
        // ...
      } else {
        // User is signed out
        // ...

        this.sesionActiva = false;
      }
    });
  }
}
