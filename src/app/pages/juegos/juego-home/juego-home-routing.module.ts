import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JuegoHomeComponent } from './juego-home.component';
import { IsloggedGuard } from 'src/app/guard/islogged.guard';
import { AhorcadoComponent } from '../ahorcado/ahorcado.component';
import { PreguntadosComponent } from '../preguntados/preguntados.component';
import { MayorMenorComponent } from '../mayor-menor/mayor-menor.component';
import { PasapalabraComponent } from '../pasapalabra/pasapalabra.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'home', component: JuegoHomeComponent, canActivate: [IsloggedGuard] },
  {path: 'ahorcado', component: AhorcadoComponent, canActivate: [IsloggedGuard] },
  {path: 'preguntados', component: PreguntadosComponent, canActivate: [IsloggedGuard] },
  {path: 'mayor-menor', component: MayorMenorComponent, canActivate: [IsloggedGuard]},
  {path: 'pasapalabras', component: PasapalabraComponent, canActivate: [IsloggedGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegoHomeRoutingModule { }
