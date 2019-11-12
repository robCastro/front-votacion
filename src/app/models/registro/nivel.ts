export interface Nivel {
	id_nivel: number;
	padre?: Nivel;
	nombre_nivel: string;
	descripcion_nivel?: string;
}
