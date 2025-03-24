import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Addlist1Component } from './addlist1.component';

describe('Addlist1Component', () => {
  let component: Addlist1Component;
  let fixture: ComponentFixture<Addlist1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Addlist1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Addlist1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
