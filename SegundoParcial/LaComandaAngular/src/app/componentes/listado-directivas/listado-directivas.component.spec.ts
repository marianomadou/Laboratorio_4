import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoDirectivasComponent } from './listado-directivas.component';

describe('ListadoDirectivasComponent', () => {
  let component: ListadoDirectivasComponent;
  let fixture: ComponentFixture<ListadoDirectivasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoDirectivasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoDirectivasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
