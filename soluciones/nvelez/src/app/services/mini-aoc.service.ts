import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Coordinate, LocationSC } from './location-sc.interface';

const DESPLAZAMIENTO = 5;
const CORRECCION_DESPLAZAMIENTO = 26;
const ULTIMO_CARACTER = 90;
const ESPACIO = 32;

@Injectable({
  providedIn: 'root'
})
export class MiniAOCService {

  private _coordinates: Coordinate[] = [];

  constructor(
    private http: HttpClient
  ) { }

  getLocation$(solution: string, reto: string = '1'): Observable<LocationSC> {
    return this.http.post(`${ environment.API_REST_URL }/reto/${reto}`, { solution });
  }

  decodeLocation(code: string): string {
    return code.split('').map((char) => {
      const charCode = char.charCodeAt(0);
      if (charCode === ESPACIO) return char;
      let charDecode = charCode + DESPLAZAMIENTO;
      if (charDecode > ULTIMO_CARACTER) charDecode = charDecode - CORRECCION_DESPLAZAMIENTO;
      return String.fromCharCode(charDecode);
    }).join('');
  }

  getCoordinates(signal: string): Coordinate[] {
    this._coordinates = [];
    let _signal = signal.replace(/[{}]/g, '');
    for (let index = 2; index < _signal.length; index++) {
      const signalLat = _signal.substring(0, index);
      const signalLong = _signal.substring(index);
      if (signalLat[0] === '0' || signalLat.length === 1 || 
          signalLong[0] === '0' || signalLong.length === 1) continue;
      this.getAllLat(signalLat, signalLong);
    }
    return this._coordinates;
  }

  getAllLat(signalLat: string, signalLong: string) {
    for (let latIndex = 1; latIndex < signalLat.length; latIndex++) {
      const decimalLat = signalLat.substring(0, latIndex) + '.' + signalLat.substring(latIndex);
      if (parseFloat(decimalLat) > 90) continue;
      this.getAllLong(decimalLat, signalLong);
    }
  }

  getAllLong(decimalLat: string, signalLong: string) {
    for (let longIndex = 1; longIndex < signalLong.length; longIndex++) {
      const decimalLong = signalLong.substring(0, longIndex) + '.' + signalLong.substring(longIndex);
      if (parseFloat(decimalLong) > 180) continue;
      const coordinates = this.addAllCoordinates(decimalLat, decimalLong);
      this._coordinates.push(...coordinates);
    }
  }

  addAllCoordinates(decimalLat: string, decimalLong: string): Coordinate[] {
    return [
      { lat: decimalLat, long: decimalLong },
      { lat: "-" + decimalLat, long: "-" + decimalLong },
      { lat: "-" + decimalLat, long: decimalLong },
      { lat: decimalLat, long: "-" + decimalLong }
    ];
  }

}
