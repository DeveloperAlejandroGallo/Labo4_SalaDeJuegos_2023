import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ToastMsgService } from 'src/app/services/toast-msg.service';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup;
  signUpForm!: FormGroup;
  estaConectado!: boolean;
  emailUsuario!: string;
  user!: Usuario;
  usuarioConectado?: Usuario;

  constructor(
      public message: ToastMsgService,
      private auth: AuthService,
      private usrService: UsuarioService  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      emailLogin: new FormControl('', [Validators.required, Validators.email]),
      passwordLogin: new FormControl('', Validators.required)
    });

    this.signUpForm = new FormGroup({
      emailSignUp: new FormControl('', Validators.email),
      NombreSignUp: new FormControl('',Validators.pattern('^[a-zA-Z]+$')),
      ApellidoSignUp: new FormControl('',Validators.pattern('^[a-zA-Z]+$')),
      usuarioSignUp: new FormControl('',Validators.pattern('^[a-zA-Z]+$')),
      esAdminSignUp: new FormControl(''),
      passwordSignUp: new FormControl('',Validators.min(4)),
      passwordRepSignUp: new FormControl('',Validators.required),

    },[Validators.required]);

    //Me suscribo al iniciar a los usuarios.
    this.usrService.traer();

    this.usuarioConectado = this.auth.logInfo();
  }


  onSubmitSignUp() {
    let email = this.emailSignUp?.value;
    let nombre = this.nombreSignUp?.value;
    let apellido = this.apellidoSignUp?.value;
    let password = this.passwordSignUp?.value;
    let usuario = this.usuarioSignUp?.value;
    let esAdmin = this.esAdminSignUp?.value;

    let usrBD: Usuario = this.getUser(email);
    console.log(usrBD)
    if(password != this.passwordRepSignUp?.value)
    {
      this.message.Error("Las contraseñas son distintas ");
      return;
    }

    if(usrBD.id != "")
    {
      this.message.Warning("El usuario ya se encuentra registrado");
      return;
    }
    this.user = {
      id: "",
      email: email,
      nombre: nombre,
      apellido: apellido,
      clave: password,
      foto: "",
      logueado: false,
      usuario: usuario,
      esAdmin: esAdmin
    }

    // localStorage.setItem('usuarioLogueado', JSON.stringify(this.user));
    // this.message.Info("Usuario dado de alta correctamente");
      this.auth.registrarCuenta(this.user);



  }

  onSubmitLogin() {
    let email = this.emailLogin?.value;
    let password = this.passwordLogin?.value;

    this.auth.iniciarSesion(email, password);

  }

  getUser(email: string): Usuario {
    let userAux: Usuario = {
      id: "",
      email: "",
      nombre: "",
      apellido: "",
      clave: "",
      foto: "",
      logueado: false,
      usuario: "",
      esAdmin: false
    }

    let usrBuscado = this.usrService.listadoUsuarios?.find(x=>x.email == email);

    if(usrBuscado){
      userAux = {
        id: usrBuscado.id,
        email: usrBuscado.email,
        nombre: usrBuscado.nombre,
        apellido: usrBuscado.apellido,
        clave: usrBuscado.clave,
        foto: usrBuscado.foto,
        logueado: usrBuscado.logueado,
        usuario: usrBuscado.usuario,
        esAdmin: usrBuscado.esAdmin
      }
    }

    return userAux ;
  }


  ingresoAutomatico(nombre: string){
    switch(nombre){
      case "Ale":
        this.loginForm.setValue({emailLogin: "ale@gmail.com", passwordLogin: "123456"});
        break;
      case "Coco":
        this.loginForm.setValue({emailLogin: "coco@gmail.com", passwordLogin: "123456"});
        break;
    }

    this.onSubmitLogin();


  }


//getters

  get emailSignUp(){
    return this.signUpForm.get('emailSignUp');
  }
  get nombreSignUp() {
    return this.signUpForm.get('NombreSignUp');
  }
  get apellidoSignUp(){
    return this.signUpForm.get('ApellidoSignUp');
  }
  get usuarioSignUp(){
    return this.signUpForm.get('usuarioSignUp');
  }
  get esAdminSignUp(){
    return this.signUpForm.get('esAdminSignUp');
  }
  get passwordSignUp() {
    return this.signUpForm.get('passwordSignUp');
  }
  get passwordRepSignUp() {
    return this.signUpForm.get('passwordRepSignUp');
  }

  get emailLogin(){
    return this.loginForm.get('emailLogin');
  }
  get passwordLogin() {
    return this.loginForm.get('passwordLogin');
  }
}
