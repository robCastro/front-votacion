import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import * as url from '../url_gateway';

@Injectable({
  providedIn: 'root'
})
export class ConteoService {

	private urlBase = url.produccion + 'votacion/';
	
	constructor(
		private http: HttpClient,
	) { }


	public putConteoKafka(id_candidato:number, id_mesa: number): Observable<boolean>{
		return this.http.put(`${this.urlBase}candidato/${id_candidato}/${id_mesa}`, {}) as Observable<boolean>;
	}

}
