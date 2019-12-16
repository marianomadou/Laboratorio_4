import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CharactersComponent} from './characters/characters.component';
import { ComicsComponent} from '../app/comics/comics.component';
import { SeriesComponent } from './series/series.component';

const routes: Routes = [
{path: '', redirectTo:'/characters', pathMatch: 'full'},
{path: 'characters', component: CharactersComponent},
{path: 'comics', component: ComicsComponent},
{path: 'series', component: SeriesComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
