import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmProprityComponent } from './rm-proprity.component';

describe('RmProprityComponent', () => {
  let component: RmProprityComponent;
  let fixture: ComponentFixture<RmProprityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmProprityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmProprityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
