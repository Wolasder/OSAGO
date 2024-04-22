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
  public titleH1: string = 'Калькулятор ОСАГО';
  public titleH2: string = 'Добавить нового водителя';
  public combineDriversInfo: CombineDriverModel[] = [];
  public driverFromInputArray: DriverModel[] = [];
  public visibleAddForm: boolean = false;
  public driverChangeInput: DriverModel = new DriverModel();
  protected currentIndexEditDriver: number | null = null;
  public carInfo: CarInfoModel = new CarInfoModel();
  protected bufferDriver: DriverModel = new DriverModel();

  constructor(private localStorageService: LocalStorageService) {}

  public ngOnInit(): void {
    this.driverFromInputArray = this.localStorageService.getLocalStorage();
  }

  public toggleVisible(event: boolean): void {
    if (this.currentIndexEditDriver) {
      this.driverFromInputArray.splice(this.currentIndexEditDriver, 1, this.bufferDriver);
    }
    this.driverChangeInput = new DriverModel();

    this.visibleAddForm = event;
  }

  public addDriverInTableArray(driver: DriverModel): void {
    if (!this.currentIndexEditDriver) {
      this.driverFromInputArray.push(driver);
    } else {
      this.driverFromInputArray.splice(this.currentIndexEditDriver, 1, driver);
      this.currentIndexEditDriver = null;
    }

    this.driverChangeInput = new DriverModel();

    this.localStorageService.setLocalStorage(this.driverFromInputArray);

    this.updatePersonInfo();
  }

  public driverChange(event: {driver: DriverModel; index: number}): void {
    this.driverChangeInput = event.driver;
    this.bufferDriver = JSON.parse(JSON.stringify(this.driverChangeInput));
    this.currentIndexEditDriver = event.index;
  }

  public carInfoKbm(event: CarInfoModel): void {
    this.carInfo = new CarInfoModel(event);
    this.updatePersonInfo();
  }

  public updatePersonInfo(): void {
    this.combineDriversInfo = this.driverFromInputArray.map(
      (driver: DriverModel) => new CombineDriverModel(driver, this.carInfo),
    );
  }
}
