import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JuegoHomeRoutingModule } from './juego-home-routing.module';
import { JuegoHomeComponent } from './juego-home.component';
import { AhorcadoComponent } from '../ahorcado/ahorcado.component';
import { PreguntadosComponent } from '../preguntados/preguntados.component';
import { MayorMenorComponent } from '../mayor-menor/mayor-menor.component';
import { NavVarModule } from 'src/app/components/nav-var/nav-var.module';
import { PasapalabraComponent } from '../pasapalabra/pasapalabra.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    JuegoHomeComponent,
    AhorcadoComponent,
    PreguntadosComponent,
    MayorMenorComponent,
    PasapalabraComponent
  ],
  imports: [CommonModule, JuegoHomeRoutingModule, NavVarModule, FormsModule],
  exports: [FormsModule],
})
export class JuegoHomeModule {}
