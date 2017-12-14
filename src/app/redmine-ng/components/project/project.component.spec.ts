import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmNgProjectComponent } from './project.component';

describe('RmNgProjectComponent', () => {
  let component: RmNgProjectComponent;
  let fixture: ComponentFixture<RmNgProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmNgProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmNgProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
