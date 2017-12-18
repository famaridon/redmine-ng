import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmNgUserComponent } from './user.component';

describe('RmNgUserComponent', () => {
  let component: RmNgUserComponent;
  let fixture: ComponentFixture<RmNgUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmNgUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmNgUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
