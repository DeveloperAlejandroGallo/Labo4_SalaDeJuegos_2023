import { Component, OnInit } from '@angular/core';
import { Partida } from 'src/app/models/partida';
import { Usuario } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { PartidasService } from 'src/app/services/partidas.service';

@Component({
  selector: 'app-juego-home',
  templateUrl: './juego-home.component.html',
  styleUrls: ['./juego-home.component.scss'],
})
export class JuegoHomeComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private partidasService: PartidasService
  ) {}

  usuarioConectado?: Usuario;
  juegos: { nombre: string; cantidadPartidas: number; puntajeTotal: number }[] =
    [];

  ngOnInit(): void {
    this.usuarioConectado = this.auth.logInfo();
    // Obtener las partidas del usuario conectado
    this.partidasService
      .getPartidasPorUsuario(this.usuarioConectado!.id)
      .subscribe((partidas: Partida[]) => {
        const juegos: {
          [nombre: string]: { cantidadPartidas: number; puntajeTotal: number };
        } = {};

        // Procesar las partidas para obtener la cantidad y puntaje total por juego
        partidas.forEach((partida: Partida) => {
          const nombreJuego = partida.juego.nombre;

          if (!juegos[nombreJuego]) {
            juegos[nombreJuego] = { cantidadPartidas: 0, puntajeTotal: 0 };
          }

          juegos[nombreJuego].cantidadPartidas++;
          juegos[nombreJuego].puntajeTotal += partida.puntajeJugada;
        });

        // Convertir el objeto juegos en un array
        this.juegos = Object.keys(juegos).map((nombreJuego) => ({
          nombre: nombreJuego,
          cantidadPartidas: juegos[nombreJuego].cantidadPartidas,
          puntajeTotal: juegos[nombreJuego].puntajeTotal,
        }));
      });
  }
}
