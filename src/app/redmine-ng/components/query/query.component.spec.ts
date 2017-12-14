import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmNgQueryComponent } from './query.component';

describe('RmNgQueryComponent', () => {
  let component: RmNgQueryComponent;
  let fixture: ComponentFixture<RmNgQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmNgQueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmNgQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
