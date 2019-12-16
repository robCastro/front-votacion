import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as url from '../url_gateway';
import  {TipoVotacion} from '../../models/disenio/tipo-votacion';



@Injectable({
  providedIn: 'root'
})
export class TipoVotacionService {
	private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});
	private urlBase = url.produccion + 'diseniovotacion/';

  constructor(private http: HttpClient) { }

  public getTipoVotacion(): Observable<TipoVotacion[]>{   //argumento de observable es la clase exportada
		console.log(this.urlBase);
		return this.http.get(`${this.urlBase}tipo_votacion`).pipe(
			map( response => response as TipoVotacion[])
		);
	}
}
