import {Injectable} from '@angular/core';
import {DriverModel} from '../shared/model/driver.model';

export enum KeyEnum {
  Drivers = 'drivers',
}

@Injectable()
export class LocalStorageService {
  public get drivers(): DriverModel[] {
    return JSON.parse(localStorage.getItem(KeyEnum.Drivers) ?? '[]');
  }

  public set drivers(drivers: DriverModel[]) {
    localStorage.setItem(KeyEnum.Drivers, JSON.stringify(drivers));
  }
}
