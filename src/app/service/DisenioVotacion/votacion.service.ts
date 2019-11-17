import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as url from './url_back';
import  {Votacion} from 'src/app/models/disenio/votacion';

@Injectable({
  providedIn: 'root'
})
export class VotacionService {
	private urlBase = url.produccion;
	public fecha_inicio_votacion:string;
	public fecha_fin_votacion:string;


  constructor(private http: HttpClient) { }

  public postVotacion(votacion: Votacion, hInicio:Date, hFin:Date): Observable<boolean>{
  		console.log(votacion.tipoVotacion.id_tipo_votacion.toString());
  		console.log(votacion.ordenamiento.id_ordenamiento.toString());
  		this.fecha_inicio_votacion=`${votacion.fecha_inicio_votacion.toString()}T${hInicio.toString()}:00.000Z`;
  		this.fecha_fin_votacion=`${votacion.fecha_fin_votacion.toString()}T${hFin.toString()}:00.000Z`;

	    const formData: FormData = new FormData();
	    formData.append('id_tipo_votacion', votacion.tipoVotacion.id_tipo_votacion.toString().replace(/ /g, ""));
	    formData.append('id_ordenamiento', votacion.ordenamiento.id_ordenamiento.toString().replace(/ /g, ""));
	    formData.append('fecha_inicio_votacion', this.fecha_inicio_votacion);
	    formData.append('fecha_fin_votacion', this.fecha_fin_votacion);
	    formData.append('nombre_votacion', votacion.nombre_votacion);
	    formData.append('descripcion_votacion', votacion.descripcion_votacion);
	    console.log(formData);
		
		return this.http.post(`${this.urlBase}votaciones`, formData) as Observable<boolean>;
};
	}


