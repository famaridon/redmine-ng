import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedmineIssuesComponent } from './redmine-issues.component';

describe('RedmineIssuesComponent', () => {
  let component: RedmineIssuesComponent;
  let fixture: ComponentFixture<RedmineIssuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedmineIssuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedmineIssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
