import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { SocketService } from '../../service/socket.service'

@Component({
  selector: 'app-votar',
  templateUrl: './votar.component.html',
  styleUrls: ['./votar.component.scss']
})
export class VotarComponent implements OnInit {

	private id_mesa:number;

	constructor(private socketService: SocketService,
				private route: ActivatedRoute,
	) { }

	ngOnInit() {
		this.displayBloqueado(true);
		this.route.queryParamMap.subscribe(params =>{
			this.id_mesa=parseInt(params.get('id_mesa'))
			console.log('dentro subscribe querymap')
			console.log(this.id_mesa);
		})
		this.socketService.emit('connection',null);
		this.socketService.listen('desbloquear').subscribe((data:any)=>{
			console.log(data);
			console.log("recibido")
			if(this.id_mesa===data)
				this.displayBloqueado(false);
		})
		console.log('fuera subscribe querymap')
		console.log(this.id_mesa);	
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



}
