import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-recruteur-modification',
  templateUrl: './recruteur-modification.component.html',
  styleUrls: ['./recruteur-modification.component.css']
})
export class RecruteurModificationComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  redirect() {
    this.router.navigate(["/recruteur/:id"]);
  }

}
