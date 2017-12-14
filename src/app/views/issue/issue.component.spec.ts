import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueComponent } from './issue.component';

describe('RmNgIssueComponent', () => {
  let component: IssueComponent;
  let fixture: ComponentFixture<IssueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
