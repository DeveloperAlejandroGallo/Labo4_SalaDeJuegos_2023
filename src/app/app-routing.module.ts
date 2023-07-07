import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './pages/error/error.component';
import { LoginComponent } from './pages/login/login.component';
import { QuienSoyComponent } from './pages/quien-soy/quien-soy.component';
import { IsloggedGuard } from './guard/islogged.guard';
import { ChatComponent } from './pages/chat/chat.component';
import { ListadosComponent } from './pages/listados/listados.component';
import { AdminEncuestaComponent } from './pages/admin/admin-encuesta/admin-encuesta.component';
import { EncuestaResponderComponent } from './pages/encuestas/encuesta-responder/encuesta-responder.component';
import { EncuestaVerComponent } from './pages/encuestas/encuesta-ver/encuesta-ver.component';
import { IsAdminGuard } from './guard/is-admin.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'quien-soy', component: QuienSoyComponent },
  // { path: 'home',component: HomeComponent, canActivate:[IsloggedGuard] },
  // { path: 'home',component: JuegoHomeComponent, canActivate:[IsloggedGuard] },
  { path: 'chat', component: ChatComponent, canActivate: [IsloggedGuard] },
  { path: 'error', component: ErrorComponent },
  {
    path: 'juegos',
    loadChildren: () =>
      import('./pages/juegos/juego-home/juego-home.module').then(
        (m) => m.JuegoHomeModule
      ),
    canActivate: [IsloggedGuard],
  },
  {path: 'listados', component: ListadosComponent, canActivate: [IsloggedGuard]},
  {path: 'encuesta', component: EncuestaResponderComponent, canActivate: [IsloggedGuard]},
  {path: 'encuesta-ver', component: EncuestaVerComponent, canActivate: [IsloggedGuard, IsAdminGuard]},

  { path: '**', pathMatch: 'full', redirectTo: 'error' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
