import {Component, EventEmitter, Output} from '@angular/core';
import {CarInfoModel} from '../shared/model/car-info.model';
import {CityModel} from "../shared/model/city.model";

@Component({
  selector: 'app-car-info',
  templateUrl: './car-info.component.html',
  styleUrls: ['./car-info.component.scss'],
})
export class CarInfoComponent {
  @Output() public carInfoChange: EventEmitter<CarInfoModel> = new EventEmitter<CarInfoModel>();

  protected carInfo: CarInfoModel = new CarInfoModel();
  protected titleCarInfo: string = 'Данные об автомобиле';

  public cityChange(city: CityModel): void {
    this.carInfo.city = city;
    this.infoChange();
  }

  public infoChange(): void {
    this.carInfoChange.emit(this.carInfo);
  }
}
