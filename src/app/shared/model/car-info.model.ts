import {CityModel} from "./city.model";

export class CarGosNumber {
  public number: string;
  public region: string;
  public country: string;

  constructor(info?: CarGosNumber) {
    this.number = info?.number ?? '';
    this.region = info?.region ?? '';
    this.country = info?.country ?? '';
  }

  public get view():string {
    return this.number.trim().toUpperCase() + ' ' + this.region.trim().toUpperCase() + ' ' + this.country.trim().toUpperCase()
  }
}

export class CarInfoModel {
  public city: CityModel;
  public brand: string;
  public gosNumber: CarGosNumber;
  public vin: string;

  constructor(info?: CarInfoModel) {
    this.city = info?.city ? new CityModel(info.city) : new CityModel();
    this.brand = info?.brand ?? '';
    this.gosNumber = info?.gosNumber ? new CarGosNumber(info.gosNumber) : new CarGosNumber();
    this.vin = info?.vin ?? '';
  }
}


