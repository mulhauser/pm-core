import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TestComponent } from './test/test.component';
import {OffresComponent} from './offres/offres.component';
import {OffreDetailComponent} from './shared/offre-detail/offre-detail.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent , pathMatch: 'full'},
      { path: 'offres', component: OffresComponent , pathMatch: 'full'},
      { path: 'offre/:id', component: OffreDetailComponent, pathMatch: 'full'},
      { path: 'test', component: TestComponent , pathMatch: 'full'},
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ] , { preloadingStrategy: PreloadAllModules })
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
