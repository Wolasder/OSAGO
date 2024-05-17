import {Component, OnInit} from '@angular/core';
import {DriverModel} from './shared/model/driver.model';
import {CarInfoModel} from './shared/model/car-info.model';
import {CombineDriverModel} from './shared/model/combine-driver.model';
import {LocalStorageService} from './services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  protected combineDriversInfo: CombineDriverModel[] = [];
  protected driverInfo: DriverModel[] = [];
  protected carInfo: CarInfoModel = new CarInfoModel();
  protected titleBlock: string = 'Добавить нового водителя';
  protected titleMain: string = 'Калькулятор ОСАГО';
  protected currentIndexEditDriver: number | null = null;
  protected driverData: DriverModel | null = null;
  private bufferDriver: DriverModel = new DriverModel();

  constructor(private localStorageService: LocalStorageService) {}

  public ngOnInit(): void {
    this.driverInfo = this.localStorageService.getLocalStorage();
  }

  protected toggleVisible(event: boolean = true): void {
    if (this.currentIndexEditDriver) {
      this.driverInfo.splice(this.currentIndexEditDriver, 1, this.bufferDriver);
    }
    this.driverData = event ? new DriverModel() : null;
  }

  protected addDriverInTableArray(driver: DriverModel): void {
    if (this.currentIndexEditDriver === null) {
      this.driverInfo.push(driver);
    } else {
      this.driverInfo.splice(this.currentIndexEditDriver, 1, driver);
      this.currentIndexEditDriver = null;
    }

    this.driverData = new DriverModel();

    this.localStorageService.setLocalStorage(this.driverInfo);

    this.updatePersonInfo();
  }

  protected driverChange(event: {driver: DriverModel; index: number}): void {
    this.driverData = event.driver;
    this.bufferDriver = JSON.parse(JSON.stringify(this.driverData));
    this.currentIndexEditDriver = event.index;
  }

  protected getCarInfo(event: CarInfoModel): void {
    this.carInfo = new CarInfoModel(event);
    this.updatePersonInfo();
  }

  protected updatePersonInfo(): void {
    this.combineDriversInfo = this.driverInfo.map(
      (driver: DriverModel) => new CombineDriverModel(driver, this.carInfo),
    );
  }
}
