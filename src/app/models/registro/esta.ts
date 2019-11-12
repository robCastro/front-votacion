import { Persona } from './persona';
import { Nivel } from './nivel';
export interface Esta {
	id_esta: number;
	persona: Persona;
	nivel: Nivel;
	activo_esta: boolean;
}
