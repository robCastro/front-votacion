import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import { TipoVotacionService } from 'src/app/service/DisenioVotacion/tipo-votacion.service';
import  {TipoVotacion} from 'src/app/models/disenio/tipo-votacion';
import  {Votacion} from 'src/app/models/disenio/votacion';
import  {Ordenamiento} from 'src/app/models/disenio/ordenamiento';
import {OrdenamientoVotacionService} from 'src/app/service/DisenioVotacion/ordenamiento-votacion.service';
import {ChangeDetectorRef } from '@angular/core';
import Swal from 'sweetalert2'
import {VotacionService} from 'src/app/service/DisenioVotacion/votacion.service';

@Component({
  selector: 'app-crear-votacion',
  templateUrl: './crear-votacion.component.html',
  styleUrls: ['./crear-votacion.component.scss']
})
export class CrearVotacionComponent implements OnInit {
	public crearVotacionControl = new FormControl('', [Validators.required]);
  public crearVotacionControl1 = new FormControl('', [Validators.required]);
	public tiposvotacion: TipoVotacion[];
	public votacion:Votacion= new Votacion();
	public idTipoSeleccionado: string;
	public des:string;
  public idOrdeSeleccionado: string;
  public desOrde:string;
  public ordenamientos:Ordenamiento[];
  public horaInicio:Date;
  public horaFin:Date;

  constructor(
    private tipoVotacionService:TipoVotacionService, 
    private ordenamientoService:OrdenamientoVotacionService,
    private cdref: ChangeDetectorRef,
    private votacionService:VotacionService
  ) { }

  ngOnInit() {
  	this.tipoVotacionService.getTipoVotacion().subscribe(TVotacion=>{
  		this.tiposvotacion=TVotacion;
  		console.log(this.tiposvotacion);
  	});
  	this.votacion.tipoVotacion = new TipoVotacion();
    this.votacion.ordenamiento = new Ordenamiento();
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

  public guardar(){
    if(this.votacion.fecha_fin_votacion==this.votacion.fecha_inicio_votacion&& this.horaInicio>=this.horaFin){
      Swal.fire({
      title: 'Error',
      text: 'Hora de fin debe ser mayor a la hora de inicio',
      icon: 'error',
      confirmButtonText: 'OK'
      });
    }
    else if(this.votacion.fecha_inicio_votacion>this.votacion.fecha_fin_votacion){
      Swal.fire({
      title: 'Error',
      text: 'Fecha de fin debe ser mayor a la fecha de inicio',
      icon: 'error',
      confirmButtonText: 'OK'
      });
    }  
    else{
      this.votacionService.postVotacion(this.votacion,this.horaInicio,this.horaFin).subscribe(
        votacion => {
          if(votacion !== null){
            Swal.fire({
              title: 'Guardado!',
              text: 'Votacion Guardada correctamente',
              icon: 'success',
              confirmButtonText: 'OK'
            });
          }
          else{
            this.displayError({error:{msg:'Ocurrió un Error Guardando la votacion, intente de nuevo'}});
          }
        }, err => {
          this.displayError(err);
          }
      );
    }
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



}
