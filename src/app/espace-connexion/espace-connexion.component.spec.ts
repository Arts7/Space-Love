import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaceConnexionComponent } from './espace-connexion.component';

describe('EspaceConnexionComponent', () => {
  let component: EspaceConnexionComponent;
  let fixture: ComponentFixture<EspaceConnexionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspaceConnexionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspaceConnexionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
