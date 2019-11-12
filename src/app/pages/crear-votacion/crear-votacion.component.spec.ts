import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearVotacionComponent } from './crear-votacion.component';

describe('CrearVotacionComponent', () => {
  let component: CrearVotacionComponent;
  let fixture: ComponentFixture<CrearVotacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearVotacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearVotacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
