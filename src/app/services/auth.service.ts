import { Injectable } from '@angular/core';
import { Usuario } from '../models/user.interface';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User  } from "firebase/auth";
import { ToastMsgService } from './toast-msg.service';
import { UsuarioService } from './usuario.service';
import { LogginLogService } from './loggin-log.service';
import { Constantes } from '../models/constantes';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  estaLogueado: boolean = false;
  redirectUrl?: string;
  public usuarioActual?: Usuario;

  constructor(private message: ToastMsgService,
              private usrService: UsuarioService,
              private logLogginService: LogginLogService,
              private router: Router,) { }

  public iniciarSesion(email:string, password: string) {

    let i: number = 0;
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in

      this.usuarioActual = this.usrService.listadoUsuarios?.find(x => x.email == userCredential.user.email);

      if(this.usuarioActual)
      {
        this.loguear(this.usuarioActual);
        this.router.navigate(['/home']);
      }

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      this.message.Error(`Ocurrio un error al ingresar el usuario: ${email}. Error: ${errorCode} - ${errorMessage}`);
    });
  }


  loguear(usr: Usuario) {
    this.estaLogueado = true;
    localStorage.setItem(Constantes.usuarioLocalStorage, JSON.stringify(usr));
    //Registro el ingreso:
    this.logLogginService.nuevo(usr.email);


    this.message.Info("Bienvenido " + usr.nombre);


  }

  public registrarCuenta(user: Usuario) {
    console.log(user.email, user.clave);

    const auth = getAuth();

    createUserWithEmailAndPassword(auth, user.email, user.clave)
    .then((userCredential) => {
      this.message.Info(`Usuario ${user.email} registrado correctamente.`);
      //Lo guardo en la coleccion:
      this.usrService.nuevo(user);
      this.loguear(user);
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 1500);

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      this.message.Error("Ocurrio un error al registrar el usuario: "+ errorCode+ " - "+ errorMessage);
      throw error;
    });
  }

  public cerrarSesion(email:string) {

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

  public logInfo():Usuario{
    let user: Usuario = {
      id: "",
      email: "",
      nombre: "",
      apellido: "",
      clave: "",
      foto: "",
      logueado: false
    }
    const auth = getAuth();
    if(auth.currentUser){
      this.usuarioActual = this.usrService.listadoUsuarios?.find(x => x.email == auth.currentUser!.email);
      if(this.usuarioActual)
      {
        user = this.usuarioActual;
        user.logueado = this.logueado();
      }
    }


    return user;

  }

}
