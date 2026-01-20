import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ikasleak } from './ikasleak';

describe('Ikasleak', () => {
  let component: Ikasleak;
  let fixture: ComponentFixture<Ikasleak>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ikasleak]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ikasleak);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
