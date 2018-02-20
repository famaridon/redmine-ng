import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmNgCategoryComponent } from './category.component';

describe('RmNgCategoryComponent', () => {
  let component: RmNgCategoryComponent;
  let fixture: ComponentFixture<RmNgCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmNgCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmNgCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
