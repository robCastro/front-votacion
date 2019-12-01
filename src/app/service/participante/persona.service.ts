import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as url from '../url_gateway';


import { Persona } from '../../models/registro/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
	private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});
	private urlBase = url.produccion + 'registro_participantes/';

	constructor(private http: HttpClient) { }

	
	public getPersonaPorCarnet(parametro:string,valor:string): Observable<Persona>{
		return this.http.get(`${this.urlBase}personas?${parametro}=${valor}`).pipe(
			map( response => response as Persona)
		);
	}
}
