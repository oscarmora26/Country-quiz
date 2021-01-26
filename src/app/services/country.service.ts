import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private _http: HttpClient) { console.log('El servicio esta funcionando correctamente')}

  getCountry(){
    return this._http.get('https://restcountries.eu/rest/v2/all')
  }
}
