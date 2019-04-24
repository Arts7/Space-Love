import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanetSystemComponent } from './planet-system.component';

describe('PlanetSystemComponent', () => {
  let component: PlanetSystemComponent;
  let fixture: ComponentFixture<PlanetSystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanetSystemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanetSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
