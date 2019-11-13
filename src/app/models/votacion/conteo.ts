import { Candidato } from './candidato';
import { Mesa } from './mesa';

export class Conteo {
	id_conteo: number;
	candidato: Candidato;
	mesa: Mesa;
	cantidad_votos_conteo: number;
}
