import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorAltaComponent } from './actor-alta.component';

describe('ActorAltaComponent', () => {
  let component: ActorAltaComponent;
  let fixture: ComponentFixture<ActorAltaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActorAltaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActorAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
