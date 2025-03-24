import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Addlist2Component } from './addlist2.component';

describe('Addlist2Component', () => {
  let component: Addlist2Component;
  let fixture: ComponentFixture<Addlist2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Addlist2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Addlist2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
