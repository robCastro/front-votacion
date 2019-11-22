import { Component, OnInit, NgZone } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { SocketService } from '../../service/socket.service';
import { MesaService } from '../../service/DisenioVotacion/mesa.service';



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


	constructor(private socketService: SocketService,
				private route: ActivatedRoute,
				private zone: NgZone,
				private mesaService: MesaService,
	) { }

	ngOnInit() {
		this.displayBloqueado(true);
		this.determineLocalIp();
		this.mesaService.getMesaPorIp(this.localIp).subscribe(
			mesa => {
				this.id_mesa = mesa[0].id_mesa;
				console.log(this.id_mesa);
			}, err => {
				this.displayError(err);
			}
		);
		this.socketService.emit('connection',null);
		this.socketService.listen('desbloquear').subscribe((data:any)=>{
			console.log(data);
			console.log("recibido")
			if(this.id_mesa===data)
				this.displayBloqueado(false);
		})
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

	private displayBloqueado(bloquear: boolean){
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
