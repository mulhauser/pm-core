import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAjoutCompetenceComponent } from './form-ajout-competence.component';

describe('FormAjoutCompetenceComponent', () => {
  let component: FormAjoutCompetenceComponent;
  let fixture: ComponentFixture<FormAjoutCompetenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAjoutCompetenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAjoutCompetenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
