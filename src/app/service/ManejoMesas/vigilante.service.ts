import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

import * as url from '../url_gateway';

import { Vigilante } from '../../models/manejo/vigilante';
import { Mesa } from '../../models/manejo/mesa';

@Injectable({
  providedIn: 'root'
})
export class VigilanteService {
	private urlBase = url.produccion + 'manejo_mesa/';


	constructor(private http: HttpClient) { }


	public getVigilante(id:number): Observable<Vigilante>{
		return this.http.get(`${this.urlBase}vigilante/${id}`) as Observable<Vigilante>
	}

	public getMesas(id:number): Observable<Mesa[]>{
		return this.http.get(`${this.urlBase}vigilante/${id}/mesas`) as Observable<Mesa[]>
	}
}
