import { TipoVotacion } from './tipo-votacion';
import { Ordenamiento } from './ordenamiento';

export interface Votacion {
	id_votacion: number;
	tipoVotacion: TipoVotacion;
	ordenamiento: Ordenamiento;
	fecha_inicio_votacion: Date;
	fecha_fin_votacion: Date;
	nombre_votacion: string;
	descripcion_votacion?: string;
}
