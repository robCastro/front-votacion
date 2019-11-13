import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as url from './url_back';


import { Afiliacion } from '../../models/votacion/afiliacion';

@Injectable({
  providedIn: 'root'
})
export class AfiliacionService {
	private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});
	private urlBase = url.produccion;

	constructor(private http: HttpClient) { }


	public getAfiliaciones(): Observable<Afiliacion[]>{
		console.log(this.urlBase);
		return this.http.get(`${this.urlBase}/afiliacion`).pipe(
			map( response => response as Afiliacion[])
		);
	}
}
