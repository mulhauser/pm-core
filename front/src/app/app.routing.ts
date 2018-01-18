import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TestComponent } from './test/test.component';
import {OffresComponent} from './offres/offres.component';
import {OffreDetailComponent} from './shared/offre-detail/offre-detail.component';
import {CandidatsComponent} from './candidats/candidats.component';
import {CandidatModificationComponent} from './candidat-modification/candidat-modification.component';
import {ExperienceComponent} from './experience/experience.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './_guards/auth.guard';
import {RegisterComponent} from './register/register.component';
import {CandidatDetailComponent} from './candidat-detail/candidat-detail.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent , pathMatch: 'full'},
      { path: 'offres', component: OffresComponent , pathMatch: 'full'},
      { path: 'offre/:id', component: OffreDetailComponent, pathMatch: 'full'},
      { path: 'candidats', component: CandidatsComponent, pathMatch: 'full'},
      { path: 'candidat/:id', component: CandidatDetailComponent, pathMatch: 'full'},
      { path: 'candidat/:id/modification', component: CandidatModificationComponent, pathMatch: 'full'},
      { path: 'test', component: TestComponent , pathMatch: 'full'},
      { path: '', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'login', component: LoginComponent, pathMatch: 'full' },
      { path: 'register', component: RegisterComponent, pathMatch: 'full' },
      { path: 'experience', component: ExperienceComponent , pathMatch: 'full'},
      { path: '**', redirectTo: '', pathMatch: 'full' },

    ] , { preloadingStrategy: PreloadAllModules })
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
