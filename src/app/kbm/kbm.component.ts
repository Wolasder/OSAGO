import {Component, Input} from '@angular/core';
import {CombineDriverModel} from "../shared/model/combine-driver.model";

@Component({
  selector: 'app-kbm',
  templateUrl: './kbm.component.html',
  styleUrls: ['./kbm.component.scss']
})
export class KbmComponent {
  @Input() public combineInfo: CombineDriverModel[] = [];


  public hiddenTable: boolean = true;
  public prise: number = 10000;
  public finalPriseInTable: number = 0;
  public kas: number = 0;
  public maxKas: number = 0;
  public maxKbm: number = 0;
  public citiK: number = 0
  public kNumOfDrivers: number = 0;

  // @Output() public combineInfoBtn: EventEmitter<CombineDriverModel> = new EventEmitter<CombineDriverModel>()

  public cityTable:string = ''


  finalPrice () {

    //валидация на заполнение полей
    if (
      !this.combineInfo[0].carInfo.brand.length ||
      !this.combineInfo[0].carInfo.gosNumber.number.length ||
      !this.combineInfo[0].carInfo.gosNumber.region.length ||
      !this.combineInfo[0].carInfo.gosNumber.country.length ||
      !this.combineInfo[0].carInfo.vin.length
    ) {
      alert('Заполните все данные автомобиля')
      return
    } else {
      this.hiddenTable = false;
    }
    // this.hiddenTable = false;

    // фиксация коэффициента города для формулы расчета финальной цены
    this.citiK = Number(this.combineInfo[0].carInfo.city.value);

    //расчет коэффициента возраст-стаж
    this.combineInfo.forEach((combineModel: CombineDriverModel) => {
      if (Number(combineModel.driver.stage) <= 3) {
        if (Number(combineModel.driver.age) >= 16 && Number(combineModel.driver.age) <= 21) {
          combineModel.driver.kas = 1.87;
        } else if (Number(combineModel.driver.age) >= 22 && Number(combineModel.driver.age) <= 70) {
          combineModel.driver.kas = 1.2;
        } else if (Number(combineModel.driver.age) >= 71) {
          combineModel.driver.kas = 1.9;
        }
      } else {
        if (Number(combineModel.driver.age) >= 16 && Number(combineModel.driver.age) <= 21) {
          combineModel.driver.kas = 1.4;
        } else if (Number(combineModel.driver.age) >= 22 && Number(combineModel.driver.age) <= 70) {
          combineModel.driver.kas = 0.96;
        } else if (Number(combineModel.driver.age) >= 71) {
          combineModel.driver.kas = 1.5;
        }
      }
    });

    // выявление максимального коэффициента возраст-стаж и кмб для расчета при нескольких водителях (берется максимальный)
    this.maxKas = this.combineInfo.reduce((acc:CombineDriverModel, curr:CombineDriverModel) => acc.driver.kas >= curr.driver.kas ? acc : curr).driver.kas;
    this.maxKbm =Number(this.combineInfo.reduce((acc:CombineDriverModel, curr:CombineDriverModel) => Number(acc.driver.kbm) >= Number(curr.driver.kbm) ? acc : curr).driver.kbm);
    //коэффициент на количество водителей
    this.kNumOfDrivers = 1 + (this.combineInfo.length / 10);
    //финальный расчет
    this.finalPriseInTable = Math.round(this.prise * this.citiK * this.maxKbm * this.maxKas * this.kNumOfDrivers);

    //мои проверки
    // console.log('коэф города ' + this.citiK)
    // console.log('коэф кмб ' + this.maxKbm)
    // console.log('коэф опыт-возраст ' + this.maxKas)
    // console.log('коэф кол-ва водителей ' + this.kNumOfDrivers)

    console.log(this.combineInfo)

  }


}

