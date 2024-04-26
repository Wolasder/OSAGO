import {Injectable} from '@angular/core';
import {DriverModel} from '../shared/model/driver.model';

export const KEY: string = 'key';

@Injectable()
export class LocalStorageService {
  public getLocalStorage(): DriverModel[] {
    return JSON.parse(localStorage.getItem(KEY) ?? '[]');
  }

  public setLocalStorage(drivers: DriverModel[]): void {
    localStorage.setItem(KEY, JSON.stringify(drivers));
  }
}
