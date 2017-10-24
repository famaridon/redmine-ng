import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectQueryIssuesComponent } from './issues.component';

describe('ProjectQueryIssuesComponent', () => {
  let component: ProjectQueryIssuesComponent;
  let fixture: ComponentFixture<ProjectQueryIssuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectQueryIssuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectQueryIssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
