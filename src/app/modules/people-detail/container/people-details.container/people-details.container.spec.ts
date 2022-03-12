import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleDetailsContainer } from './people-details.container';

describe('PeopleDetailsContainer', () => {
  let component: PeopleDetailsContainer;
  let fixture: ComponentFixture<PeopleDetailsContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PeopleDetailsContainer],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleDetailsContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
