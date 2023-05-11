import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.interface';
import { ToastMsgService } from 'src/app/services/toast-msg.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup;
  signUpForm!: FormGroup;

  user!: User;

  constructor(
      public message: ToastMsgService,
      private formBuilder: FormBuilder,
      private router: Router  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      emailL: ['', [Validators.required, Validators.email]],
      passwordL: ['', Validators.required]
    });

    this.signUpForm = this.formBuilder.group({
      emailS: ['', [Validators.required, Validators.email]],
      passwordS: ['', Validators.required],
      passwordRep: ['', Validators.required],
    });

  }


  onSubmitSignUp() {
    let email = this.signUpForm.get('emailS')?.value;
    let password = this.signUpForm.get('passwordS')?.value;

    let usrBD: User = this.getUser(email);

    if(usrBD != null)
    {
      this.message.Warning("El usuario ya se encuentra registrado");
      return;
    }

    if(password != this.signUpForm.get('passwordRep')?.value)
    {
      this.message.Error("Las contraseñas son distintas ");
      return;
    }

    this.user = new User(email, password);

    localStorage.setItem(email, JSON.stringify(this.user));
    this.message.Info("Usuario dado de alta correctamente");

  }

  onSubmitLogin() {
    let email = this.loginForm.get('emailL')?.value;
    let password = this.loginForm.get('passwordL')?.value;

    let usrBD: User = this.getUser(email);
    if (usrBD == null || usrBD.name != email || usrBD.password != password)
    {
      this.message.Error("Usuario o contraseña erroneos");
      return;
    }


    this.message.Info("Bienvenido " + usrBD.name);

    this.router.navigate(['/home']);
  }

  getUser(email: string): User {
    const usr = localStorage.getItem(email);
    return usr ? JSON.parse(usr) : null;
  }





}
