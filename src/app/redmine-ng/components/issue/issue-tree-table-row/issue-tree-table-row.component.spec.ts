import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmNgIssueTreeTableRowComponent } from './issue-tree-table-row.component';

describe('RmNgIssueTreeTableRowComponent', () => {
  let component: RmNgIssueTreeTableRowComponent;
  let fixture: ComponentFixture<RmNgIssueTreeTableRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmNgIssueTreeTableRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmNgIssueTreeTableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
