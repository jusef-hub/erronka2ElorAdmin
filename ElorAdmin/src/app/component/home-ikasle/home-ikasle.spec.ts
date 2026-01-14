import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeIkasle } from './home-ikasle';

describe('HomeIkasle', () => {
  let component: HomeIkasle;
  let fixture: ComponentFixture<HomeIkasle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeIkasle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeIkasle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
