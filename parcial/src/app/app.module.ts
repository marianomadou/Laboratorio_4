import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { PeliculasComponent } from './componentes/peliculas/peliculas.component';
import { HomeComponent } from './componentes/home/home.component';
import { CargarPeliculaComponent } from './componentes/cargar-pelicula/cargar-pelicula.component';
import { FormsModule } from '@angular/forms';
import { AngularFireStorageModule, AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { BuscarComponent } from './componentes/buscar/buscar.component';
import { BotonEliminarComponent } from './componentes/boton-eliminar/boton-eliminar.component';
import { BienvenidoComponent } from './componentes/bienvenido/bienvenido.component';
import { BusquedasComponent } from './componentes/busquedas/busquedas.component';
import { PeliculasAltaComponent } from './componentes/peliculas-alta/peliculas-alta.component';
import { ActorAltaComponent } from './componentes/actor-alta/actor-alta.component';
import { ActorListadoComponent } from './componentes/actor-listado/actor-listado.component';
import { PeliculasListadoComponent } from './componentes/peliculas-listado/peliculas-listado.component';
import { Login2Component } from './componentes/login2/login2.component';
import { ActorAltaFotoComponent } from './componentes/actor-alta-foto/actor-alta-foto.component';
import { DetallePeliculaComponent } from './componentes/detalle-pelicula/detalle-pelicula.component';

@NgModule({
  declarations: [
    AppComponent,
    PeliculasComponent,
    Login2Component,
    HomeComponent,
    CargarPeliculaComponent,
    BuscarComponent,
    BotonEliminarComponent,
    BienvenidoComponent,
    BusquedasComponent,
    PeliculasAltaComponent,
    ActorAltaComponent,
    ActorListadoComponent,
    PeliculasListadoComponent,
    ActorAltaFotoComponent,
    DetallePeliculaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    FormsModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
