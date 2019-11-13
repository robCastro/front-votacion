import { Afiliacion } from './afiliacion';
import { Votacion } from './votacion';

export class Candidato {
	id_candidato: number;
	afiliacion: Afiliacion
	votacion: Votacion;
	nombres_candidato: string;
	apellidos_candidato:string;
	carnet_candidato: string;
	apodo_candidato: string;
	url_foto_candidato: string;
	id_persona: number;
}
