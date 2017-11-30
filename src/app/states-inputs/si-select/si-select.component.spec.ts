import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiSelectComponent } from './si-select.component';

describe('SiSelectComponent', () => {
  let component: SiSelectComponent;
  let fixture: ComponentFixture<SiSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
