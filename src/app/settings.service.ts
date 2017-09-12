import { Injectable } from '@angular/core';

@Injectable()
export class SettingsService {

  constructor() {
  }

  public setString(key: string, value: string ): void {
    this.setItem(key, value);
  }
  public setBoolean(key: string, value: boolean): void {
    this.setItem(key, value);
  }
  public setNumber(key: string, value: number ): void {
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

  public getString(key: string):  string | null {
    return <string | null>this.getItem(key);
  }
  public getBoolean(key: string):  boolean | null {
    return <boolean | null>this.getItem(key);
  }
  public getNumber(key: string):  number | null {
    return <number | null>this.getItem(key);
  }
  public getObject(key: string):  object | null {
    return <object | null>this.getItem(key);
  }

  public getItem(key: string):  string | boolean | number | object | null {
    const loadedValue = localStorage.getItem(key);
    let value: string | boolean | number | object | null;
    try {
      value = JSON.parse(loadedValue);
    } catch (e) {

    }
    return loadedValue;
  }


}
