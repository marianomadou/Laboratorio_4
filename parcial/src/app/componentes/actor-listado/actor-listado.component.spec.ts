import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorListadoComponent } from './actor-listado.component';

describe('ActorListadoComponent', () => {
  let component: ActorListadoComponent;
  let fixture: ComponentFixture<ActorListadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActorListadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActorListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
