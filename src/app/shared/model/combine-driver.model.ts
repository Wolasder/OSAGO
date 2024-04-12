import {DriverModel} from "./driver.model";
import {CarInfoModel} from "./car-info.model";

export class CombineDriverModel {
  public driver: DriverModel;
  public carInfo: CarInfoModel;

  constructor(driver?: DriverModel, carInfo?: CarInfoModel) {
    this.driver = driver ?? new DriverModel();
    this.carInfo = carInfo ?? new CarInfoModel();
  }
}
