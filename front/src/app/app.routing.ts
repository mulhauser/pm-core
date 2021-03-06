import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {OffresComponent} from './offres/offres.component';
import {OffreDetailComponent} from './offre-detail/offre-detail.component';
import {CandidatsComponent} from './candidats/candidats.component';
import {CandidatModificationComponent} from './candidat-modification/candidat-modification.component';
import {ExperienceComponent} from './experience/experience.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './_guards/auth.guard';
import {RegisterComponent} from './register/register.component';
import {CandidatDetailComponent} from './candidat-detail/candidat-detail.component';
import {RecruteurDetailComponent} from './recruteur-detail/recruteur-detail.component';
import {RecruteurModificationComponent} from './recruteur-modification/recruteur-modification.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent , pathMatch: 'full'},
      { path: 'offres', component: OffresComponent , pathMatch: 'full'},
      { path: 'offre/:id', component: OffreDetailComponent, pathMatch: 'full'},

      { path: 'candidats', component: CandidatsComponent, pathMatch: 'full'},
      { path: 'candidat', component: CandidatDetailComponent, pathMatch: 'full', canActivate:[AuthGuard]},
      { path: 'candidat/:id', component: CandidatDetailComponent, pathMatch: 'full'},
      { path: 'candidat/:id/modification', component: CandidatModificationComponent, pathMatch: 'full'},

      { path: '', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'login', component: LoginComponent, pathMatch: 'full' },
      { path: 'register', component: RegisterComponent, pathMatch: 'full' },
      { path: 'experience', component: ExperienceComponent , pathMatch: 'full'},

      { path: 'recruteur', component: RecruteurDetailComponent, pathMatch: 'full', canActivate:[AuthGuard]},
      { path: 'recruteur/:id', component: RecruteurDetailComponent, pathMatch: 'full'},
      { path: 'recruteur/:id/modification', component: RecruteurModificationComponent, pathMatch: 'full'},

      { path: '**', redirectTo: '', pathMatch: 'full' },

    ] , { preloadingStrategy: PreloadAllModules })
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
