import {Component, EventEmitter, Output} from '@angular/core';
import {CityModel} from "../shared/model/city.model";
import {CarInfoModel} from "../shared/model/car-info.model";

@Component({
  selector: 'app-car-info',
  templateUrl: './car-info.component.html',
  styleUrls: ['./car-info.component.scss']
})
export class CarInfoComponent {

  @Output() public carInfoForKbm: EventEmitter<CarInfoModel> = new EventEmitter<CarInfoModel>()

  public carInfo: CarInfoModel = new CarInfoModel();

  public city: CityModel[] = [
    {city: 'Москва', value: '1.5'},
    {city: 'Санкт-Петербург', value: '1.5'},
    {city: 'Белгород', value: '1.1'},
    {city: 'Курск', value: '1.1'}
  ]

  public carInfoToKbm():void {
    this.carInfoForKbm.emit(this.carInfo)
  }

  public setKbm(event: string):void {
    this.carInfo.city.value = this.city.find((city: CityModel) => city.city === event)?.value ?? ''
    this.carInfoToKbm()
  }



}
