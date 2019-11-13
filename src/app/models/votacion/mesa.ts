import { Votacion } from './votacion';

export class Mesa {
	id_mesa: number;
	id_votacion: Votacion;
	id_centro_votacion: number;
	numero_mesa: number;
	ponderacion_mesa?: number;
	cantidad_abstenciones_mesa: number;
	cantidad_anulados_mesa: number;
	habilitada_mesa: boolean;
	en_uso_mesa: boolean;
	ip_mesa: string;
}
