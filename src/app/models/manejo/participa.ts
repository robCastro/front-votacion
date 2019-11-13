import { Mesa } from './mesa';
import { Votante } from './votante';
import { EstadoVoto } from './estado-voto';

export class Participa {
	id_participa: number;
	mesa: Mesa;
	votante: Votante;
	estadoVoto?: EstadoVoto;
	fecha_voto_participa?: Date;
	id_votacion: number
}
