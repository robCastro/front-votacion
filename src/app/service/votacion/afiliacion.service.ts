import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';


import { Afiliacion } from '../../models/votacion/afiliacion';

@Injectable({
  providedIn: 'root'
})
export class AfiliacionService {
	private urlEndPoint: string = 'http://localhost:3003/api/votacion/afiliacion';
	private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});
	

	constructor() { }


	public getAfiliaciones(): Observable<Afiliacion[]>{
		return this.http.get(this.urlEndPointTodos).pipe(
			map( response => response as Afiliacion[])
		);
	}
}
