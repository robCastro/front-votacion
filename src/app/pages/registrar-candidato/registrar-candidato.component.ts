import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { AfiliacionService } from 'src/app/service/votacion/afiliacion.service';

import { Afiliacion } from 'src/app/models/votacion/afiliacion';

@Component({
  selector: 'app-registrar-candidato',
  templateUrl: './registrar-candidato.component.html',
  styleUrls: ['./registrar-candidato.component.scss']
})
export class RegistrarCandidatoComponent implements OnInit {
	public afiliacionControl = new FormControl('', [Validators.required]);
	public afiliaciones: Afiliacion[];
	public seleccionAfiliacion: string;
  	
  	constructor(
		private afiliacionService: AfiliacionService
	) { }

	ngOnInit() {
		this.afiliacionService.getAfiliaciones().subscribe(afiliaciones => {
			console.log(afiliaciones);
			this.afiliaciones = afiliaciones;
		});
	}

}
