import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { actorPeliculaDTO } from 'src/app/actores/actor';
import { MultipleSelectorModel } from 'src/app/utilidades/selector-multiple/MultipleSelectorModel';
import { PeliculaCreacionDTO, PeliculaDTO } from '../pelicula';

@Component({
  selector: 'app-formulario-pelicula',
  templateUrl: './formulario-pelicula.component.html',
  styleUrls: ['./formulario-pelicula.component.css']
})
export class FormularioPeliculaComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  formulario: FormGroup;

  @Input()
  modelo: PeliculaDTO;

  @Input()
  errores: string[] = [];

  @Output()
  OnSubmit: EventEmitter<PeliculaCreacionDTO> = new EventEmitter<PeliculaCreacionDTO>();

  @Input()
  generosNoSeleccionados: MultipleSelectorModel[] = [];

  @Input()
  generosSeleccionados: MultipleSelectorModel[] = [];

  @Input()
  cinesNoSeleccionados: MultipleSelectorModel[] = []

  @Input()
  cinesSeleccionados: MultipleSelectorModel[] = [];

  @Input()
  actoresSeleccionados: actorPeliculaDTO[] = [];

  imagenCambiada = false; 

  ngOnInit(): void {

    this.formulario = this.formBuilder.group({
      titulo: [
        '',
        {
          validators: [Validators.required], 
        },
      ],

      resumen: '',
      enCines: false,
      trailer: '',
      fechaLanzamiento: '',
      poster: '',
      generosIds: '',
      cinesIds: '',
      actores:''
    });

    if (this.modelo !== undefined) {
      this.formulario.patchValue(this.modelo);
    }
  }

  archivoSeleccionado(archivo: File) {
    this.formulario.get('poster').setValue(archivo);
    this.imagenCambiada = true;
  }

  changeMarkdown(texto) {
    this.formulario.get('resumen').setValue(texto);
  }

  guardarCambios(){
    console.log(this.generosSeleccionados);
    const generosIds = this.generosSeleccionados.map(val => val.llave);
    this.formulario.get('generosIds').setValue(generosIds);
    const cinesIds = this.cinesSeleccionados.map(val => val.llave);
    this.formulario.get('cinesIds').setValue(cinesIds);

    const actores = this.actoresSeleccionados.map(val => {
      return {id: val.id, personaje: val.personaje}
    });
    this.formulario.get('actores').setValue(actores);
    
    if (!this.imagenCambiada){
      this.formulario.patchValue({'poster': null});
    }
  
    this.OnSubmit.emit(this.formulario.value);
  }

}
