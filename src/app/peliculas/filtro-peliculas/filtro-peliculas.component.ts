import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { generoDTO } from 'src/app/generos/genero';
import { GenerosService } from 'src/app/generos/generos.service';
import { PeliculasService } from '../peliculas.service';
import { PeliculaDTO } from '../pelicula';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-filtro-peliculas',
  templateUrl: './filtro-peliculas.component.html',
  styleUrls: ['./filtro-peliculas.component.css']
})
export class FiltroPeliculasComponent implements OnInit {

  constructor( private formBuilder: FormBuilder, private location: Location, private activatedRoute: ActivatedRoute, private generosService: GenerosService, private peliculasService: PeliculasService) { }

  formulario: FormGroup
  generos: generoDTO[] = [];
  peliculas: PeliculaDTO[];
  paginaActual = 1;
  cantidadElementosAMostrar = 10;
  cantidadElementos;

  formularioOriginal = {
    titulo: '',
    generoId: 0,
    proximosEstrenos: false,
    enCines: false 
  } 

  ngOnInit(): void {

    this.generosService.obtenerTodos()
    .subscribe(generos => {
      this.generos = generos;

    this.formulario = this.formBuilder.group(this.formularioOriginal);

    this.leerValoresUrl();
    this.buscarPeliculas(this.formulario.value);

    this.formulario.valueChanges
      .subscribe(valores => {
        this.buscarPeliculas(valores);
        this.escribirParametrosBusquedaEnURL();
      })
    })
  }

  private leerValoresUrl(){
    this.activatedRoute.queryParams.subscribe((parametro) => {
      var objeto: any = {};

      if(parametro.titulo){
        objeto.titulo = parametro.titulo;
      }

      if(parametro.generoId){
        objeto.generoId = Number(parametro.generoId); 
      }

      if(parametro.proximosEstrenos){
        objeto.proximosEstrenos = parametro.proximosEstrenos;
      }

      if(parametro.enCines){
        objeto.enCines = parametro.enCines;
      }

      this.formulario.patchValue(objeto);
    })
  }

  //Funcion para editar la ur y agregar los filtros en el querystring
  private escribirParametrosBusquedaEnURL(){
    var QueryString = [];

    var valoresFormulario = this.formulario.value;

    if(valoresFormulario.titulo){
      QueryString.push(`titulo=${valoresFormulario.titulo}`);
    }

    if(valoresFormulario.generoId != '0'){
      QueryString.push(`generoId=${valoresFormulario.generoId}`);
    }

    if(valoresFormulario.proximosEstrenos){
      QueryString.push(`proximosEstrenos=${valoresFormulario.proximosEstrenos}`);
    }

    if(valoresFormulario.enCines){
      QueryString.push(`enCines=${valoresFormulario.enCines}`);
    }

    this.location.replaceState('peliculas/buscar', QueryString.join('&'));
  }

  buscarPeliculas(valores: any){
    valores.pagina = this.paginaActual;
    valores.recordsPorPagina = this.cantidadElementosAMostrar;
    this.peliculasService.filtrar(valores).subscribe(response => {
      this.peliculas = response.body;
      this.escribirParametrosBusquedaEnURL();
      this.cantidadElementos = response.headers.get('cantidadTotalRegistros');
    })
  }

  limpiar(){
    this.formulario.patchValue(this.formularioOriginal);
  }

  paginatorUpdate(datos: PageEvent){
    this.paginaActual = datos.pageIndex + 1;
    this.cantidadElementosAMostrar = datos.pageSize;
    this.buscarPeliculas(this.formulario.value);
  }

}
