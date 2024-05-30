export class CityModel {
  public city: string | null;
  public value: string | null;

  constructor(info?: CityModel) {
    this.city = info?.city ?? '';
    this.value = info?.value ?? '';
  }
}
