import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class SettingsService {
  private static readonly SETTINGS_KEY = 'settings';

  protected subject: BehaviorSubject<Settings>;
  protected observer: Observable<Settings>;

  constructor() {
    this.subject = new BehaviorSubject(this.loadSettings());
    this.observer = this.subject.asObservable();
  }

  private loadSettings(): Settings {
    const settingsJson = localStorage.getItem(SettingsService.SETTINGS_KEY);
    if (settingsJson) {
      return new Settings(JSON.parse(settingsJson));
    } else {
      return new Settings();
    }
  }

  public save(settings: Settings) {
    localStorage.setItem(SettingsService.SETTINGS_KEY, JSON.stringify(settings));
    this.subject.next(this.loadSettings());
  }

  public getSettings(): Observable<Settings> {
    return this.observer;
  }

  public setString(key: string, value: string): void {
    this.setItem(key, value);
  }

  public setBoolean(key: string, value: boolean): void {
    this.setItem(key, value);
  }

  public setNumber(key: string, value: number): void {
    this.setItem(key, value);
  }

  public setObject(key: string, value: object): void {
    this.setItem(key, value);
  }

  private setItem(key: string, value: string | boolean | number | object): void {
    let storableValue: string;
    if (typeof value === 'object') {
      storableValue = JSON.stringify(value);
    } else {
      storableValue = <string>value;
    }
    localStorage.setItem(key, storableValue);
  }

  public getString(key: string): string | null {
    return <string | null>this.getItem(key);
  }

  public getBoolean(key: string): boolean | null {
    return <boolean | null>this.getItem(key);
  }

  public getNumber(key: string): number | null {
    return <number | null>+this.getItem(key);
  }

  public getObject(key: string): object | null {
    return <object | null>this.getItem(key);
  }

  public getItem(key: string): string | boolean | number | object | null {
    const loadedValue = localStorage.getItem(key);
    let value: string | boolean | number | object | null;
    try {
      value = JSON.parse(loadedValue);
    } catch (e) {

    }
    if (loadedValue === 'undefined') {
      return null;
    }
    return loadedValue;
  }
}

export class Settings {

  public api_key: string = null;
  public server: string = null;

  constructor(json?: any) {
    if (json) {
      this.api_key = json.api_key;
      this.server = json.server;
    }
  }

  isValide(): boolean {
    console.dir(this);
    return this.api_key != null && this.server != null;
  }

}
