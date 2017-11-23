import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmTrackerComponent } from './rm-tracker.component';

describe('RmTrackerComponent', () => {
  let component: RmTrackerComponent;
  let fixture: ComponentFixture<RmTrackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmTrackerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
