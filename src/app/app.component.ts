import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {DriverModel} from './shared/model/driver.model';
import {CarInfoModel} from './shared/model/car-info.model';
import {CombineDriverModel} from './shared/model/combine-driver.model';
import {LocalStorageService} from './services/local-storage.service';
import {CarInfoComponent} from "./car-info/car-info.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  @ViewChild('carInfo', {static: true}) public carInfoComponent!: CarInfoComponent;

  protected combineDriversInfo: CombineDriverModel[] = [];
  protected driverInfo: DriverModel[] = [];
  protected carInfo: CarInfoModel = new CarInfoModel();
  protected currentIndexEditDriver: number | null = null;
  protected driverData: DriverModel | null = null;
  private bufferDriver: DriverModel = new DriverModel();

  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    this.driverInfo = this.localStorageService.drivers;
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
    this.localStorageService.drivers = this.driverInfo;
    this.driverInfo = [...this.driverInfo];

    this.updatePersonInfo();
    this.cdr.markForCheck();
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
