import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { credencialesUsuario } from '../seguridad';

@Component({
  selector: 'app-formulario-autenticacion',
  templateUrl: './formulario-autenticacion.component.html',
  styleUrls: ['./formulario-autenticacion.component.css']
})
export class FormularioAutenticacionComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }
  formulario: FormGroup;
  
  @Input()
  errores: string[] = [];
  
  @Input()
  accion: string;

  @Output()
  onSubmit: EventEmitter<credencialesUsuario> = new EventEmitter<credencialesUsuario>();

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      email: [
        '',
        {
          validators: [Validators.required, Validators.email],
        },
      ],
      password: [
        '',
        {
          validators: [Validators.required]
        }
      ]
    });
  }

  obtenerMensajeErrorEmail(){
    var campo = this.formulario.get('email');
    if (campo.hasError('required')){
      return 'El campo Email es requerido';
    }

    if (campo.hasError('email')){
      return 'El email no es válido';
    }

    return '';
  }
}
