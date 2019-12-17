import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerfilInvitadoComponent } from './componentes/perfil-invitado/perfil-invitado.component';
import { PerfilAdminComponent } from './componentes/perfil-admin/perfil-admin.component';
import { PerfilUsuarioComponent } from './componentes/perfil-usuario/perfil-usuario.component';
import { PerfilGuardGuard } from './servicios/guard/perfil-guard.guard';
import { AdminGuard } from './servicios/guard/admin.guard';
import { UsuarioGuard } from './servicios/guard/usuario.guard';
import { PerfilEmpleadoComponent } from './componentes/perfil-empleado/perfil-empleado.component';
import { PerfilMozoComponent } from './componentes/perfil-mozo/perfil-mozo.component';
import { BienvenidaComponent } from './componentes/bienvenida/bienvenida.component';

const routes: Routes = [

  { path: 'perfil', component: PerfilInvitadoComponent, canActivate: [PerfilGuardGuard] },
  { path: 'admin', component: PerfilAdminComponent, canActivate: [AdminGuard] },
  { path: 'cliente', component: PerfilUsuarioComponent, canActivate: [UsuarioGuard] },
  { path: 'empleado', component: PerfilEmpleadoComponent },
  { path: 'mozo', component: PerfilMozoComponent },
  { path: 'bienvenida', component: BienvenidaComponent},
  { path: '', redirectTo: '/bienvenida', pathMatch: 'full' }//redireccionar al login al terminar de editar
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
