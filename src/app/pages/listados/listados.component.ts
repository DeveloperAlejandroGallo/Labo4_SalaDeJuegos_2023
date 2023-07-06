import { Component, OnInit } from '@angular/core';
import { Partida } from 'src/app/models/partida';
import { Usuario } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { PartidasService } from 'src/app/services/partidas.service';

@Component({
  selector: 'app-listados',
  templateUrl: './listados.component.html',
  styleUrls: ['./listados.component.scss']
})
export class ListadosComponent implements OnInit{

  filtroNombre: string = '';
  listadoDePartidas: Array<Partida> = [];
  usuarioConectado: Usuario | undefined = this.auth.logInfo();


  constructor(private partidasSrv: PartidasService,
              private auth: AuthService) { }

  ngOnInit(): void {

    this.partidasSrv.allPartidas$.subscribe((partidas: Array<Partida>) => {
      this.listadoDePartidas = partidas;
    });


  }



















}
