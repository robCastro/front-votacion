import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { AfiliacionService } from 'src/app/service/votacion/afiliacion.service';
import { PersonaService } from '../../service/participante/persona.service';
import { CandidatoService } from '../../service/votacion/candidato.service'

import { Afiliacion } from 'src/app/models/votacion/afiliacion';
import { Candidato } from '../../models/votacion/candidato';
import { Votacion } from '../../models/votacion/votacion';
import { Persona } from '../../models/registro/persona';

@Component({
  selector: 'app-registrar-candidato',
  templateUrl: './registrar-candidato.component.html',
  styleUrls: ['./registrar-candidato.component.scss']
})
export class RegistrarCandidatoComponent implements OnInit {
	public requeridosControl = new FormControl('', [Validators.required]);
	public afiliaciones: Afiliacion[];
	public carnetBuscar: string;
	public candidato: Candidato = new Candidato();
	public persona: Persona = new Persona();
	public seleccionAfiliacion: string;
	public imagenPorSubir: File = null;
  	
  	constructor(
		private afiliacionService: AfiliacionService,
		private personaService: PersonaService,
		private candidatoService: CandidatoService
	) { }

	ngOnInit() {
		this.candidato.afiliacion = new Afiliacion();
		this.candidato.votacion = new Votacion(); // SUSTITUIR ESTO CON GET VOTACION
		this.candidato.votacion.id_votacion = 1; // SUSTITUIR ESTO CON GET VOTACION
		this.afiliacionService.getAfiliaciones().subscribe(afiliaciones => {
			this.afiliaciones = afiliaciones;
		});
	}

	public buscar(){
		if(this.carnetBuscar){
			this.personaService.getPersonaPorCarnet('carnet',this.carnetBuscar).subscribe(persona => {
				if(persona !== null){
					this.candidato.nombres_candidato = persona.nombres_persona;
					this.candidato.apellidos_candidato = persona.apellidos_persona;
					this.candidato.id_persona = persona.id_persona;
					this.candidato.carnet_candidato = persona.carnet_organizacion_persona;
					this.persona = persona;
					console.log('Persona ')
					console.log(this.persona)
					console.log('Candidato ')
					console.log(this.candidato)
				}
				else{
					Swal.fire({
						title: 'Error!',
						text: 'Esta persona no esta registrada',
						icon: 'error',
						confirmButtonText: 'Ok'
					});
				}
			});
		}	
		else{
			Swal.fire({
				title: 'Error!',
				text: 'Especifique carnet',
				icon: 'error',
				confirmButtonText: 'Ok'
			});
		}
	}

	public manejadorArchivo(files: FileList){
		this.imagenPorSubir = files.item(0);
		this.candidato.url_foto_candidato = files.item(0);
	}

	public guardar(){
		this.candidatoService.postCandidato(this.candidato).subscribe(candidato => {
			if(candidato !== null){
				Swal.fire({
					title: 'Guardado!',
					text: 'Candidato Guardado correctamente',
					icon: 'success',
					confirmButtonText: 'OK'
				});
			}
			else{
				Swal.fire({
					title: 'Error!',
					text: 'Ocurrió un Error Guardando el Candidato, intente de nuevo',
					icon: 'warning',
					confirmButtonText: 'OK'
				});
			}
		});
	}

}
