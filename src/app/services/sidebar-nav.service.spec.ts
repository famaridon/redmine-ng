import { TestBed, inject } from '@angular/core/testing';

import { SidebarNavService } from './sidebar-nav.service';

describe('SidebarNavService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SidebarNavService]
    });
  });

  it('should be created', inject([SidebarNavService], (service: SidebarNavService) => {
    expect(service).toBeTruthy();
  }));
});
