import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeIrakasle } from './home-irakasle';

describe('HomeIrakasle', () => {
  let component: HomeIrakasle;
  let fixture: ComponentFixture<HomeIrakasle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeIrakasle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeIrakasle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
