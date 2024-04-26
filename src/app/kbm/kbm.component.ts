import {Component, Input} from '@angular/core';
import {CombineDriverModel} from '../shared/model/combine-driver.model';

@Component({
  selector: 'app-kbm',
  templateUrl: './kbm.component.html',
  styleUrls: ['./kbm.component.scss'],
})
export class KbmComponent {
  @Input() public combineInfo: CombineDriverModel[] = [];
  protected titleKmb: string = 'Расчет стоимости ОСАГО';
  protected hiddenTable: boolean = true;
  protected finalPrise: number = 0;
  private maxCoefficientAgeStage: number = 0;
  private maxValueKbm: number = 0;
  private CoefficientCity: number = 0;
  private CoefficientNumOfDrivers: number = 0;
  private BasePrise: number = 10000;

  protected GetPrice() {
    //валидация на заполнение полей
    if (
      !this.combineInfo[0].carInfo.model.length ||
      !this.combineInfo[0].carInfo.gosNumber.number.length ||
      !this.combineInfo[0].carInfo.gosNumber.region.length ||
      !this.combineInfo[0].carInfo.gosNumber.country.length ||
      !this.combineInfo[0].carInfo.vin.length
    ) {
      alert('Заполните все данные автомобиля');
      return;
    } else {
      this.hiddenTable = false;
    }

    // фиксация коэффициента города для формулы расчета финальной цены
    this.CoefficientCity = Number(this.combineInfo[0].carInfo.city.value);

    //расчет коэффициента возраст-стаж
    this.combineInfo.forEach((combineModel: CombineDriverModel) => {
      if (Number(combineModel.driver.stage) <= 3) {
        if (Number(combineModel.driver.age) >= 16 && Number(combineModel.driver.age) <= 21) {
          combineModel.driver.coefficientAgeStage = 1.87;
        } else if (Number(combineModel.driver.age) >= 22 && Number(combineModel.driver.age) <= 70) {
          combineModel.driver.coefficientAgeStage = 1.2;
        } else if (Number(combineModel.driver.age) >= 71) {
          combineModel.driver.coefficientAgeStage = 1.9;
        }
      } else {
        if (Number(combineModel.driver.age) >= 16 && Number(combineModel.driver.age) <= 21) {
          combineModel.driver.coefficientAgeStage = 1.4;
        } else if (Number(combineModel.driver.age) >= 22 && Number(combineModel.driver.age) <= 70) {
          combineModel.driver.coefficientAgeStage = 0.96;
        } else if (Number(combineModel.driver.age) >= 71) {
          combineModel.driver.coefficientAgeStage = 1.5;
        }
      }
    });

    // выявление максимального коэффициента возраст-стаж и кмб для расчета при нескольких водителях (берется максимальный)
    this.maxCoefficientAgeStage = this.combineInfo.reduce((acc: CombineDriverModel, curr: CombineDriverModel) =>
      acc.driver.coefficientAgeStage >= curr.driver.coefficientAgeStage ? acc : curr,
    ).driver.coefficientAgeStage;
    this.maxValueKbm = Number(
      this.combineInfo.reduce((acc: CombineDriverModel, curr: CombineDriverModel) =>
        Number(acc.driver.kbm) >= Number(curr.driver.kbm) ? acc : curr,
      ).driver.kbm,
    );
    //коэффициент на количество водителей
    this.CoefficientNumOfDrivers = 1 + this.combineInfo.length / 10;
    //финальный расчет
    this.finalPrise = Math.round(
      this.BasePrise * this.CoefficientCity * this.maxValueKbm * this.maxCoefficientAgeStage * this.CoefficientNumOfDrivers,
    );
  }
}
