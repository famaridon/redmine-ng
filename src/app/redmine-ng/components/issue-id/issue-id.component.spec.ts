import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmNgIssueIdComponent } from './issue-id.component';

describe('RmNgIssueIdComponent', () => {
  let component: RmNgIssueIdComponent;
  let fixture: ComponentFixture<RmNgIssueIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmNgIssueIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmNgIssueIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
