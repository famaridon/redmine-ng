import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueIdComponent } from './issue-id.component';

describe('IssueIdComponent', () => {
  let component: IssueIdComponent;
  let fixture: ComponentFixture<IssueIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
