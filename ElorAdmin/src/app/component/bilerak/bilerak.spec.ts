import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bilerak } from './bilerak';

describe('Bilerak', () => {
  let component: Bilerak;
  let fixture: ComponentFixture<Bilerak>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bilerak]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Bilerak);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
