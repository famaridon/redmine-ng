import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmNgPriorityComponent } from './priority.component';

describe('RmNgPriorityComponent', () => {
  let component: RmNgPriorityComponent;
  let fixture: ComponentFixture<RmNgPriorityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmNgPriorityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmNgPriorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
