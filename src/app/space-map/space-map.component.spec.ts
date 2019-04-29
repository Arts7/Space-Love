import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceMapComponent } from './space-map.component';

describe('SpaceMapComponent', () => {
  let component: SpaceMapComponent;
  let fixture: ComponentFixture<SpaceMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpaceMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
