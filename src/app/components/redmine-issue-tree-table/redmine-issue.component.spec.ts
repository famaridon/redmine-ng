import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedmineIssueComponent } from './redmine-issue.component';

describe('RedmineIssueComponent', () => {
  let component: RedmineIssueComponent;
  let fixture: ComponentFixture<RedmineIssueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedmineIssueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedmineIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
