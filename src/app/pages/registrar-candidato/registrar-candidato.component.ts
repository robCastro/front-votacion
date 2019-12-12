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
		this.displayProcesando(true);
		this.candidato.afiliacion = new Afiliacion();
		this.candidato.votacion = new Votacion(); // SUSTITUIR ESTO CON GET VOTACION
		this.candidato.votacion.id_votacion = 1; // SUSTITUIR ESTO CON GET VOTACION
		this.afiliacionService.getAfiliaciones().subscribe(afiliaciones => {
			this.afiliaciones = afiliaciones;
			this.displayProcesando(false);
		});
	}

	public buscar(){
		this.displayProcesando(true);
		if(this.carnetBuscar){
			this.personaService.getPersonaPorCarnet('carnet',this.carnetBuscar).subscribe(
				persona => {
					if(persona !== null){
						this.candidato.nombres_candidato = persona.nombres_persona;
						this.candidato.apellidos_candidato = persona.apellidos_persona;
						this.candidato.id_persona = persona.id_persona;
						this.candidato.carnet_candidato = persona.carnet_organizacion_persona;
						this.persona = persona;
						this.displayProcesando(false);
					}
					else{
						this.displayError({error:{msg:'Esta persona no esta registrada'}});
					}
				},
				err => {
					this.displayError(err);
				}
			);
		}	
		else{
			this.displayError({error:{msg:'Especifique carnet'}});
		}
	}

	public manejadorArchivo(files: FileList){
		this.imagenPorSubir = files.item(0);
		this.candidato.url_foto_candidato = files.item(0);
	}

	public guardar(){
		// https://stackoverflow.com/questions/35326689/how-to-catch-exception-correctly-from-http-request
		let errores: string[] = [];
		if(typeof this.candidato.votacion === 'undefined') errores.push('Falta Votacion');
		if(typeof this.candidato.id_persona === 'undefined') errores.push('Buscar al candidato por carnet');
		if(typeof this.candidato.apodo_candidato === 'undefined') errores.push('Especificar un apodo para candidato');
		if(typeof this.candidato.afiliacion.id_afiliacion === 'undefined') errores.push('Escoger una Afiliacion');	
		if(typeof this.candidato.url_foto_candidato === 'undefined') errores.push('Escoger una Imagen');
		if(errores.length > 0){
			let msg = "Por favor:<br>"
			for (var i = 0; i < errores.length; i++) {
				msg = msg + (i+1).toString() + ") " + errores[i] + "<br>";
			}
			this.displayError({error:{msg:msg}});	
			return;	
		}
		console.log(this.candidato);
		this.candidatoService.postCandidato(this.candidato).subscribe(
			candidato => {
				if(candidato !== null){
					Swal.fire({
						title: 'Guardado!',
						text: 'Candidato Guardado correctamente',
						icon: 'success',
						confirmButtonText: 'OK'
					});
				}
				else{
					this.displayError({error:{msg:'Ocurrió un Error Guardando el Candidato, intente de nuevo'}});
				}
			}, err => {
				this.displayError(err);
			}
		);
	}

	private displayError(err: any){
		let msg = "";
		err.error.msg ? msg = err.error.msg : msg = err.message;
		Swal.fire({
			title: '<strong>Error!</strong>',
			html: msg,
			icon: 'error',
			confirmButtonText: 'OK'
		});
		console.log(err);
	}

	private displayProcesando(abrir: boolean){
		if(abrir){
			Swal.fire({
				position: 'top-end',
				title: 'Procesando',
				html: '...',
				icon: 'info',
				showConfirmButton: false,
				allowOutsideClick: false,
  				allowEscapeKey: false,
			});
		}
		else{
			Swal.close();
		}
	}
}
