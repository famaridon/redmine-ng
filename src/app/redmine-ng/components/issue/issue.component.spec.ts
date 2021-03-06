import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmNgIssueComponent } from './issue.component';

describe('RmNgIssueComponent', () => {
  let component: RmNgIssueComponent;
  let fixture: ComponentFixture<RmNgIssueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmNgIssueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmNgIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
