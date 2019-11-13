import { Votacion } from './votacion';
import { CentroVotacion } from './centro-votacion';
export class Mesa {
	id_mesa: number;
	votacion: Votacion;
	centroVotacion: CentroVotacion;
	numero_mesa: number;
	ponderacion_mesa?: number;
	cantidad_abstenciones_mesa: number;
	cantidad_anulados_mesa: number;
	habilitada_mesa: boolean;
	en_uso_mesa: boolean;
	ip_mesa: string;
}
