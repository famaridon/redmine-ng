import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SettingsService } from './settings.service';

@Injectable()
export class SettingsGuardService implements CanActivate {

  private settingsService: SettingsService;
  private router: Router;

  constructor(settingsService: SettingsService, router: Router) {
    this.settingsService = settingsService;
    this.router = router;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url = state.url;
    if (this.settingsService.isValide() || url === '/settings') { return true; }
    // Navigate to the settings page
    this.router.navigate(['/settings']);
    return false;
  }

}
