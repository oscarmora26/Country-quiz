import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapitalCountyComponent } from './capital-county.component';

describe('CapitalCountyComponent', () => {
  let component: CapitalCountyComponent;
  let fixture: ComponentFixture<CapitalCountyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapitalCountyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapitalCountyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
