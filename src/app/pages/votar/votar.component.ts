import { Component, OnInit, NgZone } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { SocketService } from '../../service/socket.service';
import { MesaService } from '../../service/DisenioVotacion/mesa.service';
import { ConteoService } from '../../service/votacion/conteo.service';
import { VotacionService } from '../../service/votacion/votacion.service';

import { Candidato } from '../../models/votacion/candidato';

declare global {
	interface Window {
		RTCPeerConnection: RTCPeerConnection;
		mozRTCPeerConnection: RTCPeerConnection;
		webkitRTCPeerConnection: RTCPeerConnection;
	}
}

@Component({
  selector: 'app-votar',
  templateUrl: './votar.component.html',
  styleUrls: ['./votar.component.scss']
})
export class VotarComponent implements OnInit {

	private id_mesa:number;
	private localIp = sessionStorage.getItem('LOCAL_IP');
	private ipRegex = new RegExp(/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/);
	private id_votante: number = null;
	public candidatos = [];


	constructor(private socketService: SocketService,
				private route: ActivatedRoute,
				private zone: NgZone,
				private mesaService: MesaService,
				private conteoService: ConteoService,
				private votacionService: VotacionService,
	) { }

	ngOnInit() {
		//this.displayProcesando(true);
		this.displayBloqueado(true);
		this.determineLocalIp();
		this.mesaService.getMesaPorIp(this.localIp).subscribe(
			mesa => {
				this.id_mesa = mesa[0].id_mesa;
				console.log('id_mesa: ', this.id_mesa);
			}, err => {
				this.displayError(err);
			}
		);
		this.socketService.emit('connection',null);
		this.socketService.listen('desbloquear').subscribe((mensaje:any)=>{
			console.log("recibido");
			console.log(mensaje);
			if(this.id_mesa===mensaje.id_mesa){
				this.displayBloqueado(false);
				this.id_votante = mensaje.id_votante;
			}
		});
		this.votacionService.getCandidatos(1).subscribe((candidatos:Candidato[]) => {
			this.candidatos = candidatos;
			console.log(this.candidatos);
			//this.displayProcesando(false);
		})
	}



	public votar(id_candidato: number){
		// Aqui arriba crear y validar participacion
		// Mejor no, mejor en gateway
		this.displayProcesando(true);
		this.conteoService.putConteoKafka(id_candidato, this.id_mesa).subscribe(
			respuesta => {
				// display bloqueado hasta que hayan pasado 3 segundos
				this.displayBloqueado(true, 3002);
				Swal.fire({
					title: 'Guardado!',
					text: 'Voto guardado',
					icon: 'success',
					showConfirmButton: false,
					allowOutsideClick: false,
	  				allowEscapeKey: false,
					timer: 3000,
					timerProgressBar: true
				});
				this.id_votante = null;
			},
			err => {
				this.displayError(err);
				console.log(err);
				this.id_votante = null;
			}
		);
	}

	public anular(anular:boolean){
		// Verificar y crear participacion aqui 
		// Mejor no, validar en gateway
		console.log('anular');
		this.displayProcesando(true);
		this.mesaService.anularVoto(this.id_mesa, anular).subscribe(
			respuesta => {
				// display bloqueado hasta que hayan pasado 3 segundos
				this.displayBloqueado(true, 3002);
				let msj = "";
				anular ? msj = "Voto Anulado" : msj = "Abstencion registrada";
				Swal.fire({
					title: 'Guardado!',
					text: msj,
					icon: 'success',
					showConfirmButton: false,
					allowOutsideClick: false,
	  				allowEscapeKey: false,
					timer: 3000,
					timerProgressBar: true
				});
				this.id_votante = null;
			}, err => {
				this.displayError(err);
				console.log(err);
				this.id_votante = null;
			}
		);
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

	private displayBloqueado(bloquear: boolean, retardo?:number){
		console.log(!isNaN(retardo), retardo);
		if(!isNaN(retardo) && bloquear){
			setTimeout(function(){
				Swal.fire({
					title: 'Bloqueado',
					html: 'Pasar a mesa',
					icon: 'warning',
					showConfirmButton: false,
					allowOutsideClick: false,
	  				allowEscapeKey: false,
				});	
			}, retardo)
		}
		else{
			if(bloquear){
				Swal.fire({
					title: 'Bloqueado',
					html: 'Pasar a mesa',
					icon: 'warning',
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






	private determineLocalIp() {
		window.RTCPeerConnection = this.getRTCPeerConnection();

		const pc = new RTCPeerConnection({ iceServers: [] });
		pc.createDataChannel('');
		pc.createOffer().then(pc.setLocalDescription.bind(pc));

		pc.onicecandidate = (ice) => {
			this.zone.run(() => {
				if (!ice || !ice.candidate || !ice.candidate.candidate) {
					return;
				}

				this.localIp = this.ipRegex.exec(ice.candidate.candidate)[1];
				sessionStorage.setItem('LOCAL_IP', this.localIp);

				pc.onicecandidate = () => {};
				pc.close();
			});
		};
	}


	private getRTCPeerConnection() {
		return window.RTCPeerConnection ||
		window.mozRTCPeerConnection ||
		window.webkitRTCPeerConnection;
	}

}
