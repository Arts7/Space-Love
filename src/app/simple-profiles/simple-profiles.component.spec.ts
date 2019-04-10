import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleProfilesComponent } from './simple-profiles.component';

describe('SimpleProfilesComponent', () => {
  let component: SimpleProfilesComponent;
  let fixture: ComponentFixture<SimpleProfilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleProfilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
