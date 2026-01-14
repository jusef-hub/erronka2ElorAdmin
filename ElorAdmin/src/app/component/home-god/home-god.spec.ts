import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeGod } from './home-god';

describe('HomeGod', () => {
  let component: HomeGod;
  let fixture: ComponentFixture<HomeGod>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeGod]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeGod);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
