import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmTextComponent } from './rm-text.component';

describe('RmTextComponent', () => {
  let component: RmTextComponent;
  let fixture: ComponentFixture<RmTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
