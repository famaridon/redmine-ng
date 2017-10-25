import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedmineIssueTreeTableComponent } from './redmine-issue-tree-table.component';

describe('RedmineIssueTreeTableComponent', () => {
  let component: RedmineIssueTreeTableComponent;
  let fixture: ComponentFixture<RedmineIssueTreeTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedmineIssueTreeTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedmineIssueTreeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
