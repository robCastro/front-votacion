export class Votacion {
	id_votacion: number;
	fecha_inicio_votacion: Date;
	fecha_fin_votacion: Date;
	nombre_votacion: string;
	descripcion_votacion?: string;
	id_ordenamiento: number;
	id_tipo_votacion: number;
}
