import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaceRechercheComponent } from './espace-recherche.component';

describe('EspaceRechercheComponent', () => {
  let component: EspaceRechercheComponent;
  let fixture: ComponentFixture<EspaceRechercheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspaceRechercheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspaceRechercheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
