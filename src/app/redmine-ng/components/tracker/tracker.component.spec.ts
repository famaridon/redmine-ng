import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmNgTrackerComponent } from './tracker.component';

describe('RmNgTrackerComponent', () => {
  let component: RmNgTrackerComponent;
  let fixture: ComponentFixture<RmNgTrackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmNgTrackerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmNgTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
