import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { LocationSC } from './location-sc.interface';

const DESPLAZAMIENTO = 5;
const CORRECCION_DESPLAZAMIENTO = 26;
const ULTIMO_CARACTER = 90;
const ESPACIO = 32;

@Injectable({
  providedIn: 'root'
})
export class MiniAOCService {

  constructor(
    private http: HttpClient
  ) { }

  decodeLocation(code: string): string {
    return code.split('').map((char) => {
      const charCode = char.charCodeAt(0);
      if (charCode === ESPACIO) return char;
      let charDecode = charCode + DESPLAZAMIENTO;
      if (charDecode > ULTIMO_CARACTER) charDecode = charDecode - CORRECCION_DESPLAZAMIENTO;
      return String.fromCharCode(charDecode);
    }).join('');
  }

  getLocation$(solution: string): Observable<LocationSC> {
    return this.http.post(environment.API_REST_URL + '/reto/1', { solution });
  }

}
