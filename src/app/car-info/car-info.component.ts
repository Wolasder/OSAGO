import {Component, EventEmitter, Output} from '@angular/core';
import {CarInfoModel} from '../shared/model/car-info.model';

@Component({
  selector: 'app-car-info',
  templateUrl: './car-info.component.html',
  styleUrls: ['./car-info.component.scss'],
})
export class CarInfoComponent {
  @Output() public carInfoForKbm: EventEmitter<CarInfoModel> = new EventEmitter<CarInfoModel>();

  public carInfo: CarInfoModel = new CarInfoModel();
  public titleH2: string = 'Данные об автомобиле';

  public carInfoToKbm(): void {
    this.carInfoForKbm.emit(this.carInfo);
  }
}
