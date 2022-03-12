import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleListContainer } from './people-list.container.component';

describe('PeopleListContainer', () => {
  let component: PeopleListContainer;
  let fixture: ComponentFixture<PeopleListContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PeopleListContainer],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleListContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
