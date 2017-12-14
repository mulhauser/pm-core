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
import {TestService} from './shared/test.service';
import {HttpClientModule} from '@angular/common/http';
import { OffresComponent } from './offres/offres.component';
import {AppDataService} from './shared/app-data';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import { OffreComponent } from './offre/offre.component';
import {OffreService} from './shared/offre.service';
import { OffreDetailComponent } from './shared/offre-detail/offre-detail.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { ModalInscriptionCandidatComponent } from './shared/modal-inscription-candidat/modal-inscription-candidat.component';
import { FormInscriptionCandidatComponent } from './shared/form-inscription-candidat/form-inscription-candidat.component';
import { CandidatComponent } from './candidat/candidat.component';
import {CandidatService} from './shared/candidat.service';
import {RecruteurService} from './shared/recruteur.service';
import { CandidatsComponent } from './candidats/candidats.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    FooterComponent,
    TestComponent,
    OffresComponent,
    OffreComponent,
    OffreDetailComponent,
    InscriptionComponent,
    ModalInscriptionCandidatComponent,
    FormInscriptionCandidatComponent,
    CandidatComponent,
    CandidatsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    NgbModule.forRoot(),
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(AppDataService), // CETTE LIGNE C'EST POUR AVOIR UNE DB LOCALE en gros
  ],
  providers: [OffreService, CandidatService, RecruteurService],
  bootstrap: [AppComponent],
  entryComponents: [ModalInscriptionCandidatComponent]
})
export class AppModule { }
