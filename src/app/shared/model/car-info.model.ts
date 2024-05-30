import {CityModel} from './city.model';

export class CarGosNumber {
  public number: string | null;
  public region: string | null;
  public country: string | null;

  constructor(info?: CarGosNumber) {
    this.number = info?.number ?? '';
    this.region = info?.region ?? '';
    this.country = info?.country ?? '';
  }

  public get view(): string | null {
    return (
      this.number?.trim().toUpperCase() +
      ' ' +
      this.region?.trim().toUpperCase() +
      ' ' +
      this.country?.trim().toUpperCase()
    );
  }
}

export class CarInfoModel {
  public city: CityModel | null;
  public model: string | null;
  public gosNumber: CarGosNumber | null;
  public vin: string | null;

  constructor(info?: CarInfoModel) {
    this.city = info?.city ? new CityModel(info.city) : new CityModel();
    this.model = info?.model ?? '';
    this.gosNumber = info?.gosNumber ? new CarGosNumber(info.gosNumber) : new CarGosNumber();
    this.vin = info?.vin ?? '';
  }
}
