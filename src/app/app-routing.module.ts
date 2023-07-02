import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './pages/error/error.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { QuienSoyComponent } from './pages/quien-soy/quien-soy.component';
import { IsloggedGuard } from './guard/islogged.guard';
import { ChatComponent } from './pages/chat/chat.component';
import { JuegoHomeComponent } from './pages/juegos/juego-home/juego-home.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login',component: LoginComponent },
  { path: 'quien-soy',component: QuienSoyComponent },
  // { path: 'home',component: HomeComponent, canActivate:[IsloggedGuard] },
  { path: 'juegos',component: JuegoHomeComponent, canActivate:[IsloggedGuard] },
  { path: 'chat', component: ChatComponent, canActivate: [IsloggedGuard]},
  { path: 'error',component: ErrorComponent },
  { path: 'juegos', loadChildren: () => import('./pages/juegos/juego-home/juego-home.module').then(m => m.JuegoHomeModule)},



  {path: '**', pathMatch: 'full', redirectTo: 'error'}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
