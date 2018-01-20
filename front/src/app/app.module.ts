import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {AppRoutingModule} from './app.routing';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './footer/footer.component';
import { TestComponent } from './test/test.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { OffresComponent } from './offres/offres.component';
import { OffreComponent } from './offre/offre.component';
import {OffreService} from './shared/offre.service';
import { OffreDetailComponent } from './shared/offre-detail/offre-detail.component';
import { CandidatComponent } from './candidat/candidat.component';
import {CandidatService} from './shared/candidat.service';
import {RecruteurService} from './shared/recruteur.service';
import { CandidatsComponent } from './candidats/candidats.component';
import { FormsModule } from '@angular/forms';
import { ModalConnexionCandidatComponent } from './shared/modal-connexion-candidat/modal-connexion-candidat.component';
import { FormConnexionCandidatComponent } from './shared/form-connexion-candidat/form-connexion-candidat.component';
import { CandidatDetailComponent } from './candidat-detail/candidat-detail.component';
import { CandidatModificationComponent } from './candidat-modification/candidat-modification.component';
import { RecruteurDetailComponent } from './recruteur-detail/recruteur-detail.component';
import { RecruteurModificationComponent } from './recruteur-modification/recruteur-modification.component';
import {CompetencesService} from './shared/competences.service';
import { CompetenceComponent } from './competence/competence.component';
import { ExperienceComponent } from './experience/experience.component';
import {ExperienceService} from './shared/experience.service';
import { LoginComponent } from './login/login.component';
import {HttpModule} from '@angular/http';
import {RegisterComponent} from './register/register.component';
import {AlertComponent} from './_directives/alert.component';
import {AuthGuard} from './_guards/auth.guard';
import {AlertService} from './_services/alert.service';
import {AuthenticationService} from './_services/authentication.service';
import {UserService} from './_services/user.service';
import {JwtInterceptor} from './_helpers/jwt.interceptor';
import { FormUpdateCandidatComponent } from './shared/form-update-candidat/form-update-candidat.component';
import { FormAjoutExperienceComponent } from './shared/form-ajout-experience/form-ajout-experience.component';
import { ModalAjoutExperienceComponent } from './shared/modal-ajout-experience/modal-ajout-experience.component';
import { ExperiencesModificationComponent } from './experiences-modification/experiences-modification.component';
import {ModalAjoutCompetenceComponent} from './shared/modal-ajout-competence/modal-ajout-competence.component';
import {FormAjoutCompetenceComponent} from './shared/form-ajout-competence/form-ajout-competence.component';
import {DatePipe} from '@angular/common';
import {CookieService} from 'ngx-cookie-service';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    FooterComponent,
    TestComponent,
    //OffresComponent,
    //OffreComponent,
    //OffreDetailComponent,
    ModalConnexionCandidatComponent,
    FormConnexionCandidatComponent,
    CandidatComponent,
    CandidatsComponent,
    CandidatDetailComponent,
    CandidatModificationComponent,
    RecruteurDetailComponent,
    RecruteurModificationComponent,
    CompetenceComponent,
    ExperienceComponent,
    LoginComponent,
    AlertComponent,
    RegisterComponent,
    FormUpdateCandidatComponent,
    FormAjoutExperienceComponent,
    ModalAjoutExperienceComponent,
    ExperiencesModificationComponent,
    ModalAjoutCompetenceComponent,
    FormAjoutCompetenceComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule
    // HttpClientInMemoryWebApiModule.forRoot(AppDataService), // CETTE LIGNE C'EST POUR AVOIR UNE DB LOCALE en gros
  ],
  providers: [OffreService,
    CandidatService,
    RecruteurService,
    CompetencesService,
    ExperienceService,
    AuthGuard, DatePipe,
    AlertService,
    AuthenticationService,
    UserService,
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
   ],
  bootstrap: [AppComponent],
  entryComponents: [ModalConnexionCandidatComponent,
    ModalAjoutExperienceComponent,
    ModalAjoutCompetenceComponent]
})
export class AppModule { }
