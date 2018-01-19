import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAjoutCompetenceComponent } from './modal-ajout-competence.component';

describe('ModalAjoutCompetenceComponent', () => {
  let component: ModalAjoutCompetenceComponent;
  let fixture: ComponentFixture<ModalAjoutCompetenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAjoutCompetenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAjoutCompetenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
