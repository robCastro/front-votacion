import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import * as url from '../url_gateway';


import { Votacion } from '../../models/votacion/votacion';

@Injectable({
  providedIn: 'root'
})
export class VotacionService {
	private urlBase = url.produccion + 'votacion/';

	constructor(
		private http: HttpClient,
	) { }

	public getVotacion(id: number): Observable<Votacion>{
		return this.http.get(`${this.urlBase}votacion/${id}`) as Observable<Votacion>
	}
}
