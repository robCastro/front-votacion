import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as url from '../url_gateway';
import  {Ordenamiento} from '../../models/disenio/ordenamiento';

@Injectable({
  providedIn: 'root'
})
export class OrdenamientoVotacionService {
	private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});
	private urlBase = url.produccion + 'diseniovotacion/';


  constructor(private http: HttpClient) { }

  public getOrdenamiento(): Observable<Ordenamiento[]>{   //argumento de observable es la clase exportada
		console.log(this.urlBase);
		return this.http.get(`${this.urlBase}ordenamiento`).pipe(
			map( response => response as Ordenamiento[])
		);
	}
}
