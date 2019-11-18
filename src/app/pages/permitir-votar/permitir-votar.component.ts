import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import Swal from 'sweetalert2';


import { VotacionService as VotacionDisenioService } from '../../service/DisenioVotacion/votacion.service';
import { VotacionService as VotacionVotacionService } from '../../service/votacion/votacion.service';
import { VigilanteService } from '../../service/ManejoMesas/vigilante.service';


import { Votacion as VotacionDisenio } from '../../models/disenio/votacion';
import { Votacion as VotacionVotacion } from '../../models/votacion/votacion';
import { Vigilante } from '../../models/manejo/vigilante'

@Component({
  selector: 'app-permitir-votar',
  templateUrl: './permitir-votar.component.html',
  styleUrls: ['./permitir-votar.component.scss']
})
export class PermitirVotarComponent implements OnInit {

	public votacionDisenio: VotacionDisenio;
	public votacionVotacion: VotacionVotacion;
	public vigilante: Vigilante;

	constructor(
		private route: ActivatedRoute,
		private votacionDisenioService: VotacionDisenioService,
		private votacionVotacionService: VotacionVotacionService,
		private vigilanteService: VigilanteService
	) { }

	ngOnInit() {
		this.displayProcesando(true);

		this.route.paramMap.subscribe(params =>{
			console.log(params.get('id_vot'));
			this.vigilanteService.getVigilante(parseInt(params.get('id_vig'))).subscribe(
				vigilante => {
					this.vigilante = vigilante;
				},err => {
					if(err.status === 404)
						this.displayError(err)
					else
						this.displayError({error:{msg:'Error buscando vigilante'}})
				}
			);
			
			this.votacionDisenioService.getVotacion(parseInt(params.get('id_vot'))).subscribe(
				votacion => {
					this.votacionDisenio = votacion;
					this.displayProcesando(false);
				}, err => {
					console.log('Error a Disenio: ');
					console.log(err);
					if(err.status === 404){
						this.displayError(err);
						return;
					}
					this.votacionVotacionService.getVotacion(parseInt(params.get('id_vot'))).subscribe(
						votacion2 => {
							this.votacionVotacion = votacion2;
							this.displayProcesando(false);
						},err2 => {
							if(err2.status == 404){
								this.displayError(err2)
								return;
							}
							console.log('Error a Votacion: ')
							console.log(err2);
							this.displayError({error:{msg:'No fue posible contactar a los servidores'}})
						}
					);
				}
			);
		});
		
	}

	private displayError(err: any){
		console.log(err);
		let msg = "";
		err.error.msg ? msg = err.error.msg : msg = err.message;
		Swal.fire({
			title: '<strong>Error!</strong>',
			html: msg,
			icon: 'error',
			confirmButtonText: 'OK'
		});
		
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
