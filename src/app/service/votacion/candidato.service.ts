import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as url from './url_back';

import { Candidato } from '../../models/votacion/candidato';

@Injectable({
  providedIn: 'root'
})
export class CandidatoService {
	private urlBase = url.desarrollo;
	private httpHeaders = new HttpHeaders({'Content-Type':'multipart/form-data'});

	constructor(private http: HttpClient) { }

	public postCandidato(candidato: Candidato): Observable<boolean>{
	    const formData: FormData = new FormData();
	    formData.append('id_afiliacion', candidato.afiliacion.id_afiliacion.toString());
	    formData.append('id_votacion', candidato.votacion.id_votacion.toString());
	    formData.append('nombres_candidato', candidato.nombres_candidato);
	    formData.append('apellidos_candidato', candidato.apellidos_candidato);
	    formData.append('carnet_candidato', candidato.carnet_candidato);
	    formData.append('apodo_candidato', candidato.apodo_candidato);
	    formData.append('foto', candidato.url_foto_candidato);
	    formData.append('id_persona', candidato.id_persona.toString());
	    console.log(formData);
		//return this.http.post(`${this.urlBase}candidato`, formData, {headers: this.httpHeaders});
		return this.http.post(`${this.urlBase}candidato`, formData) as Observable<boolean>;
	}
}
