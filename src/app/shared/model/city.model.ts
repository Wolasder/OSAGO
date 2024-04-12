export class CityModel {
  public city: string;
  public value: string;

  constructor(info?: CityModel) {
    this.city = info?.city ?? '';
    this.value = info?.value ?? '';
  }
}
