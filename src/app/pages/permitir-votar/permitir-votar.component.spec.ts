import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermitirVotarComponent } from './permitir-votar.component';

describe('PermitirVotarComponent', () => {
  let component: PermitirVotarComponent;
  let fixture: ComponentFixture<PermitirVotarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermitirVotarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermitirVotarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
