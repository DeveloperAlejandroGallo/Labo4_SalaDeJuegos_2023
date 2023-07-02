import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Carta, Mazo } from '../models/carta';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  palabra!: string;
  constructor(private http: HttpClient) {  }

  getPalabraAlAzar() {
    this.http.get(environment.palabrasAlAzar).subscribe({
      next: (palabra) => {
        this.palabra = palabra as string;
        console.log('Palabra:',this.palabra);
      },
      error: (err) =>  console.error('Error al leer las palabras al azar: ' + err),
    });
  }


  getMazoDeCartas(): Mazo | any{
    this.http.get(environment.nuevoMazoCartas).subscribe({
      next: (mazo) => {
        return mazo as Mazo;
      },
      error: (err) =>  console.error('Error al leer el mazo de cartas: ' + err),
    });
  }

  getNuevaCartaDeMazo(mazo: Mazo): Carta | any{
    this.http.get(environment.nuevaCarta.replace('<<deck_id>>',mazo.deck_id)).subscribe({
      next: (carta) => {
        return carta as Carta;
      },
      error: (err) =>  console.error('Error al leer la carta del mazo: ' + err),
    });

  }
}
