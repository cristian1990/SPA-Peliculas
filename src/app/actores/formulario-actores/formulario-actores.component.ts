import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { actorCreacionDTO, actorDTO } from '../actor';

@Component({
  selector: 'app-formulario-actores',
  templateUrl: './formulario-actores.component.html',
  styleUrls: ['./formulario-actores.component.css']
})
export class FormularioActoresComponent implements OnInit {

  constructor(private formBulder :FormBuilder) { }

  formulario: FormGroup;

  @Input()
  modelo: actorDTO;

  @Input()
  errores: string[] = [];

  @Output()
  OnSubmit: EventEmitter<actorCreacionDTO> = new EventEmitter<actorCreacionDTO>();

  imagenCambiada = false;

  ngOnInit(): void {
    this.formulario = this.formBulder.group({
      nombre: ['', { 
        validators: [Validators.required], 
      },
    ],
    fechaNacimiento:'', 
    foto: '',
    biografia: ''
    });

    if(this.modelo !== undefined){
      this.formulario.patchValue(this.modelo)
    }  
  }

  archivoSeleccionado(file){
    this.imagenCambiada = true;

    this.formulario.get('foto').setValue(file);
  }

  cambioMarkdown(texto: string){
    this.formulario.get('biografia').setValue(texto);
  }

  onSubmit(){
    if (!this.imagenCambiada){ 
      this.formulario.patchValue({'foto': null});
    }
    this.OnSubmit.emit(this.formulario.value);
  }

}
