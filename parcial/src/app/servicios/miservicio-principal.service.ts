import { Injectable } from '@angular/core';
import { ActoresServiciosService } from './actores-servicios.service';
import { PeliculasServicioService } from './peliculas-servicio.service';

@Injectable({
  providedIn: 'root'
})
export class MiservicioPrincipalService {

  constructor(public servActores: ActoresServiciosService,
  public servPeliculas: PeliculasServicioService) { }
}
