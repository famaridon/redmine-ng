import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmNgStatusComponent } from './status.component';

describe('RmNgStatusComponent', () => {
  let component: RmNgStatusComponent;
  let fixture: ComponentFixture<RmNgStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmNgStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmNgStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
