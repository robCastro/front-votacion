import { Vigilante } from './vigilante';
import { Mesa } from './mesa';
export interface Cuida {
	id_cuida: number;
	vigilante: Vigilante;
	mesa: Mesa;
}
