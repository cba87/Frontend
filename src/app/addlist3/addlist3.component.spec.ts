import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Addlist3Component } from './addlist3.component';

describe('Addlist3Component', () => {
  let component: Addlist3Component;
  let fixture: ComponentFixture<Addlist3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Addlist3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Addlist3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
