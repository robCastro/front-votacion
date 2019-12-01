import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as url from '../url_gateway';

import { Mesa } from '../../models/disenio/mesa';

@Injectable({
  providedIn: 'root'
})
export class MesaService {
	private urlBase = url.produccion + 'diseniovotacion/';

	constructor(
		private http: HttpClient,
	) { }

	public getMesaPorIp(ip: string): Observable<Mesa>{
		return this.http.get(`${this.urlBase}mesas?ip=${ip}`) as Observable<Mesa>;
	}
}
