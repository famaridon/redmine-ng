import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmNgVersionComponent } from './version.component';

describe('RmNgVersionComponent', () => {
  let component: RmNgVersionComponent;
  let fixture: ComponentFixture<RmNgVersionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmNgVersionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmNgVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
