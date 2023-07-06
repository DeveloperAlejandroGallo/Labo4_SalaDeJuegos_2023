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


  getMazoDeCartas(): Promise<Mazo> {
    return new Promise((resolve, reject) => {
      this.http.get(environment.nuevoMazoCartas).subscribe({
        next: (mazo) => {
          resolve(mazo as Mazo);
        },
        error: (err) => {
          console.error('Error al leer el mazo de cartas: ' + err);
          reject(err);
        },
      });
    });
  }


    getNuevaCartaDeMazo(mazoDeckId: string): Promise<Carta> {
      return new Promise((resolve, reject) => {
        this.http.get(environment.nuevaCarta.replace('<<deck_id>>', mazoDeckId)).subscribe({
          next: (carta) => {
            resolve(carta as Carta);
          },
          error: (err) => {
            console.error('Error al leer la carta del mazo: ' + err);
            reject(err);
          },
        });
      });
    }

}
