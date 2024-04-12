import {Component, OnInit} from '@angular/core';
import { DriverModel } from "./shared/model/driver.model";
import {CarInfoModel} from "./shared/model/car-info.model";
import {CombineDriverModel} from "./shared/model/combine-driver.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  public combineDriversInfo: CombineDriverModel[] = [];
  public driverFromInputArray: DriverModel[] = [];
  public visibleAddForm: boolean = false;
  public driverChangeInput: DriverModel = new DriverModel();
  private currentIndexEditDriver: number | null = null;
  public carInfo: CarInfoModel = new CarInfoModel();
  public bufferDriver: DriverModel = new DriverModel()


  public ngOnInit(): void {
    this.driverFromInputArray = JSON.parse(localStorage.getItem('key') ?? '[]');
  }

  public toggleVisible(event: boolean):void {
    if (this.currentIndexEditDriver) {
      this.driverFromInputArray.splice(this.currentIndexEditDriver, 1, this.bufferDriver)
    }
    this.driverChangeInput = new DriverModel();

    this.visibleAddForm = event;
  }

  public addDriverInTableArray(driver: DriverModel):void {
    if (this.currentIndexEditDriver === null) {
      this.driverFromInputArray.push(driver)
    } else {
      this.driverFromInputArray.splice(this.currentIndexEditDriver, 1, driver);
      this.currentIndexEditDriver = null;
    }

    this.driverChangeInput = new DriverModel();

    localStorage.setItem('key', JSON.stringify(this.driverFromInputArray));

    this.updatePersonInfo()
  }

  public driverChange(event: {driver: DriverModel, index: number}):void {
    this.driverChangeInput = event.driver;
    this.bufferDriver = JSON.parse(JSON.stringify(this.driverChangeInput))
    this.currentIndexEditDriver = event.index;
  }

  public carInfoKbm(event: CarInfoModel): void {
    this.carInfo = new CarInfoModel(event)
    this.updatePersonInfo()
  }

  public updatePersonInfo():void {
    this.combineDriversInfo = this.driverFromInputArray.map((driver: DriverModel) => new CombineDriverModel(driver, this.carInfo))
  }

}
