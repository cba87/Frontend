import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Addlist4Component } from './addlist4.component';

describe('Addlist4Component', () => {
  let component: Addlist4Component;
  let fixture: ComponentFixture<Addlist4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Addlist4Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Addlist4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
