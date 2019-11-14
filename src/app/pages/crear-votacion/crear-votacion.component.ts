import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import { TipoVotacionService } from 'src/app/service/DisenioVotacion/tipo-votacion.service';
import  {TipoVotacion} from 'src/app/models/disenio/tipo-votacion';
import  {Votacion} from 'src/app/models/disenio/votacion';
import  {Ordenamiento} from 'src/app/models/disenio/ordenamiento';
import {OrdenamientoVotacionService} from 'src/app/service/DisenioVotacion/ordenamiento-votacion.service';
import {ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-crear-votacion',
  templateUrl: './crear-votacion.component.html',
  styleUrls: ['./crear-votacion.component.scss']
})
export class CrearVotacionComponent implements OnInit {
	public crearVotacionControl = new FormControl('', [Validators.required]);
	public tiposvotacion: TipoVotacion[];
	public votacion:Votacion= new Votacion();
	public idTipoSeleccionado: string;
	public des:string;
  public idOrdeSeleccionado: string;
  public desOrde:string;
  public ordenamientos:Ordenamiento[];

  constructor(private tipoVotacionService:TipoVotacionService, private ordenamientoService:OrdenamientoVotacionService,
    private cdref: ChangeDetectorRef) { }

  ngOnInit() {
  	this.tipoVotacionService.getTipoVotacion().subscribe(TVotacion=>{
  		this.tiposvotacion=TVotacion;
  		console.log(this.tiposvotacion);
  	});
  	this.votacion.tipoVotacion = new TipoVotacion();
  	this.des="";

     this.ordenamientoService.getOrdenamiento().subscribe(TOrde=>{
      this.ordenamientos=TOrde;
      console.log(this.ordenamientos);
    });
     this.cdref.detectChanges();//funcion para que no marque error al cambio de las funciones cambiarDes y cambiarOrde
  }


  cambiarDes():void{
  	let i: number = 0;
  	if(!this.idTipoSeleccionado){
  		this.des = "";
  		return;
  	}
  	for(i; i < this.tiposvotacion.length; i++){
  		if(this.tiposvotacion[i].id_tipo_votacion === parseInt(this.idTipoSeleccionado)){
  			this.des = this.tiposvotacion[i].descripcion_tipo_votacion;
  			break;
  		}
  	}
  }

    cambiarOrde():void{
    let i: number = 0;
    if(!this.idOrdeSeleccionado){
      this.desOrde = "";
      return;
    }
    for(i; i < this.ordenamientos.length; i++){
      if(this.ordenamientos[i].id_ordenamiento === parseInt(this.idOrdeSeleccionado)){
        this.desOrde = this.ordenamientos[i].descripcion_ordenamiento;
        break;
      }
    }
  }

}
