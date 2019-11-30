import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { BienvenidoComponent } from './componentes/bienvenido/bienvenido.component';
import { BusquedasComponent } from './componentes/busquedas/busquedas.component';
import { PeliculasAltaComponent } from './componentes/peliculas-alta/peliculas-alta.component';
import { ActorAltaComponent } from './componentes/actor-alta/actor-alta.component';
import { ActorListadoComponent } from './componentes/actor-listado/actor-listado.component';
import { PeliculasComponent } from './componentes/peliculas/peliculas.component';
import { PeliculasListadoComponent } from './componentes/peliculas-listado/peliculas-listado.component';
import { CargarPeliculaComponent } from './componentes/cargar-pelicula/cargar-pelicula.component';
import { AuthGuard } from './servicios/auth.guard';
import { Login2Component } from './componentes/login2/login2.component';


const routes: Routes = [
  { path:  'home', component:  HomeComponent },
  { path:  'bienvenido', component:  BienvenidoComponent },
  { path:  'busqueda', component:  BusquedasComponent},
  { path:  'peliculas/alta', component: CargarPeliculaComponent, canActivate: [AuthGuard]},
  { path:  'actor/alta', component:  ActorAltaComponent ,  canActivate: [AuthGuard]},
  { path:  'actor/listado', component:  ActorListadoComponent },
  { path:  'peliculas/listado', component:  PeliculasListadoComponent},
  { path:  'login', component:  Login2Component},
  { path: '', redirectTo: '/home', pathMatch: 'full' }]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
