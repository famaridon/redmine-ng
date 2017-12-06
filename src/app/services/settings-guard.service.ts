import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {SettingsService} from './settings.service';

@Injectable()
export class SettingsGuardService implements CanActivate {

  private settingsService: SettingsService;
  private router: Router;

  constructor(settingsService: SettingsService, router: Router) {
    this.settingsService = settingsService;
    this.router = router;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const url = state.url;

    const result = new Promise<boolean>((resolve, reject) => {
      this.settingsService.getSettings().subscribe((settings) => {
        if (settings.isValide() || url === '/settings') {
          resolve(true);
        } else {
          console.log('settings not ready plz configure application.');
          this.router.navigate(['/settings']);
          resolve(false);
        }
      }, (error) => {
        reject(error);
      });

    });

    return result;
  }

}
