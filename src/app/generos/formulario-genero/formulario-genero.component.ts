import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { primeraLetraMayuscula } from '../../utilidades/validadores/primeraLetraMayuscula';
import { generoCreacionDTO } from '../genero';

@Component({
  selector: 'app-formulario-genero',
  templateUrl: './formulario-genero.component.html',
  styleUrls: ['./formulario-genero.component.css']
})
export class FormularioGeneroComponent implements OnInit {

  constructor( private formBuilder: FormBuilder) { }

   formulario: FormGroup;

   @Input()
   errores: string[] = [];

   @Input()
   modelo: generoCreacionDTO;

   @Output()
   onSubmit: EventEmitter<generoCreacionDTO> = new EventEmitter<generoCreacionDTO>();

   ngOnInit(): void {
     this.formulario = this.formBuilder.group({
       nombre: ['',{
         validators: [Validators.required, Validators.minLength(3), primeraLetraMayuscula()] 
       }]
     });

     if(this.modelo !== undefined){
      this.formulario.patchValue(this.modelo);
     }  
   }

   guardarCambios(){
    this.onSubmit.emit(this.formulario.value);
   }

   //Funcion para validacion de nombre
   obtenerErrorCampoNombre(){
     var campo = this.formulario.get('nombre'); 
     if(campo.hasError('required')){ 
       return 'El campo nombre es requerido';
     }
     if(campo.hasError('minlength')){
       return 'La longitud minima es de 3 caracteres';
     }
     if(campo.hasError('primeraLetraMayuscula')){ 
       return campo.getError('primeraLetraMayuscula').mensaje;
     }

     return '';
   }

}
