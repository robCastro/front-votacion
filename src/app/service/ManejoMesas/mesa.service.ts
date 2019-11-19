import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

import * as url from './url_back';

import { Votante } from '../../models/manejo/votante';

@Injectable({
  providedIn: 'root'
})
export class MesaService {
	private urlBase = url.desarrollo;

	constructor(private http: HttpClient) { }

	public getVotantes(id:number): Observable<Votante[]>{
		return this.http.get(`${this.urlBase}mesa/${id}/votantes`) as Observable<Votante[]>
	}
}
