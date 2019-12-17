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

import { FormsModule } from '@angular/forms';
import { AngularFireStorageModule, AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { BuscarComponent } from './componentes/buscar/buscar.component';
import { BotonEliminarComponent } from './componentes/boton-eliminar/boton-eliminar.component';
import { BusquedasComponent } from './componentes/busquedas/busquedas.component';

import { TodosComponent } from './componentes/todos/todos.component';
import { AltaProductoComponent } from './componentes/alta-producto/alta-producto.component';
import { AltaUsuarioComponent } from './componentes/alta-usuario/alta-usuario.component';
import { ListadoProductoComponent } from './componentes/listado-producto/listado-producto.component';
import { ListadoUsuariosComponent } from './componentes/listado-usuarios/listado-usuarios.component';
import { DestalleProductoComponent } from './componentes/destalle-producto/destalle-producto.component';
import {MaterialModule} from './material.module';
import { BotonAgregarComponent } from './componentes/boton-agregar/boton-agregar.component';
import { DetalleUsuarioComponent } from './componentes/detalle-usuario/detalle-usuario.component';
import { EncabezadoComponent } from './componentes/encabezado/encabezado.component';
import { PerfilInvitadoComponent } from './componentes/perfil-invitado/perfil-invitado.component';
import { PerfilUsuarioComponent } from './componentes/perfil-usuario/perfil-usuario.component';
import { PerfilAdminComponent } from './componentes/perfil-admin/perfil-admin.component';
import { ModificaUsuarioComponent } from './componentes/modifica-usuario/modifica-usuario.component';
import { AltaMesaComponent } from './componentes/alta-mesa/alta-mesa.component';
import { LoginComponent } from './componentes/login/login.component';
import { ListadoMesaComponent } from './componentes/listado-mesa/listado-mesa.component';
import { EstadoPedidoComponent } from './componentes/estado-pedido/estado-pedido.component';
import { ConfirmarPedidoComponent } from './componentes/confirmar-pedido/confirmar-pedido.component';
import { PerfilEmpleadoComponent } from './componentes/perfil-empleado/perfil-empleado.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { ToastrModule } from 'ngx-toastr';
import { PedirMesaComponent } from './componentes/pedir-mesa/pedir-mesa.component';
import { DetalleMesaComponent } from './componentes/detalle-mesa/detalle-mesa.component';
import { ListadoPreciosComponent } from './componentes/listado-precios/listado-precios.component';
import { ListadoPedidosComponent } from './componentes/listado-pedidos/listado-pedidos.component';
import { MiniDetalleMesaComponent } from './componentes/mini-detalle-mesa/mini-detalle-mesa.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { PerfilMozoComponent } from './componentes/perfil-mozo/perfil-mozo.component';
import { EncuestaComponent } from './componentes/encuesta/encuesta.component';
import { PuntosEncuestaComponent } from './componentes/puntos-encuesta/puntos-encuesta.component';
import { ListadoEncuestasComponent } from './componentes/listado-encuestas/listado-encuestas.component';
import { ListadoDirectivasComponent } from './componentes/listado-directivas/listado-directivas.component';
import { ListaMesaDirective } from './directivas/lista-mesa.directive';
import {  AreasPipe} from './directivas/areas.pipe';
import { EstadosPipe } from './directivas/estados.pipe';
import { ColorPedidoDirective } from './directivas/color-pedido.directive';
import { ElegirMesaComponent } from './componentes/elegir-mesa/elegir-mesa.component';
import { EstadosMesaClientePipe } from './directivas/estados-mesa-cliente.pipe';
import { ColorBadgeAreaDirective } from './directivas/color-badge-area.directive';
import { RecaptchaModule } from 'ng-recaptcha';
import { DetalleCuentaComponent } from './componentes/detalle-cuenta/detalle-cuenta.component';
import { SliderModule } from 'angular-image-slider';
import { ParallaxModule, ParallaxConfig } from 'ngx-parallax';
import { HighchartsChartModule } from 'highcharts-angular';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BienvenidaComponent } from './componentes/bienvenida/bienvenida.component';


@NgModule({
  declarations: [
    AppComponent,
    BuscarComponent,
    BotonEliminarComponent,
    BusquedasComponent,
    TodosComponent,
    AltaUsuarioComponent,
    AltaProductoComponent,
    ListadoProductoComponent,
    ListadoUsuariosComponent,
    DestalleProductoComponent,
    BotonAgregarComponent,
    DetalleUsuarioComponent,
    EncabezadoComponent,
    PerfilInvitadoComponent,
    PerfilUsuarioComponent,
    PerfilAdminComponent,
    ModificaUsuarioComponent,
    AltaMesaComponent,
    LoginComponent,
    ListadoMesaComponent,
    EstadoPedidoComponent,
    ConfirmarPedidoComponent,
    PerfilEmpleadoComponent,
    PedirMesaComponent,
    DetalleMesaComponent,
    ListadoPreciosComponent,
    ListadoPedidosComponent,
    MiniDetalleMesaComponent,
    PerfilMozoComponent,
    EncuestaComponent,
    PuntosEncuestaComponent,
    ListadoEncuestasComponent,
    ListadoDirectivasComponent, 
    DetalleCuentaComponent,
    ListaMesaDirective, 
    AreasPipe, 
    EstadosPipe, 
    ColorPedidoDirective, 
    ElegirMesaComponent, 
    EstadosMesaClientePipe, 
    ColorBadgeAreaDirective, 
    BienvenidaComponent
  ],
  imports: [
    BrowserModule, NgxSpinnerModule, RecaptchaModule,   SliderModule,
    MaterialModule, ParallaxModule, HighchartsChartModule,
     CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(), 
    AppRoutingModule,
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    FormsModule,
    NgxMaterialTimepickerModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
