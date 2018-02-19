import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmNgUserAvatarComponent } from './user-avatar.component';

describe('RmNgUserAvatarComponent', () => {
  let component: RmNgUserAvatarComponent;
  let fixture: ComponentFixture<RmNgUserAvatarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmNgUserAvatarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmNgUserAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
