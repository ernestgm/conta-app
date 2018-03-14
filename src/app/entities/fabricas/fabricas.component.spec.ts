import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FabricasComponent } from './fabricas.component';

describe('FabricasComponent', () => {
  let component: FabricasComponent;
  let fixture: ComponentFixture<FabricasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FabricasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FabricasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
