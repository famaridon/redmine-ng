import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmNgIssueModalComponent } from './issue-modal.component';

describe('RmNgIssueModalComponent', () => {
  let component: RmNgIssueModalComponent;
  let fixture: ComponentFixture<RmNgIssueModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmNgIssueModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmNgIssueModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
