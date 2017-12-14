import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TestComponent } from './test/test.component';
import {OffresComponent} from './offres/offres.component';
import {OffreDetailComponent} from './shared/offre-detail/offre-detail.component';
import {InscriptionComponent} from './inscription/inscription.component';
import {CandidatsComponent} from './candidats/candidats.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent , pathMatch: 'full'},
      { path: 'offres', component: OffresComponent , pathMatch: 'full'},
      { path: 'offre/:id', component: OffreDetailComponent, pathMatch: 'full'},
      { path: 'candidats', component: CandidatsComponent, pathMatch: 'full'},
//      { path: 'candidat/:id', component: CandidatsComponent, pathMatch: 'full'},
      { path: 'inscription', component: InscriptionComponent, pathMatch: 'full'},
      { path: 'test', component: TestComponent , pathMatch: 'full'},
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ] , { preloadingStrategy: PreloadAllModules })
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
