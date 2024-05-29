import {Injectable} from '@angular/core';
import {CombineDriverModel} from '../shared/model/combine-driver.model';

const BASE_PRICE: number = 10000;

@Injectable()
export class KbmLogicService {
  public calcPrice(combineInfo: CombineDriverModel[]): number {
    // фиксация коэффициента города для формулы расчета финальной цены
    const coefficientCity: number = Number(combineInfo[0].carInfo.city?.value);

    //расчет коэффициента возраст-стаж
    combineInfo.forEach((combineModel: CombineDriverModel) => {
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
    const maxCoefficientAgeStage: number = Number(
      combineInfo.reduce((acc: CombineDriverModel, curr: CombineDriverModel) =>
        acc.driver.coefficientAgeStage >= curr.driver.coefficientAgeStage ? acc : curr,
      ).driver.coefficientAgeStage,
    );

    const maxValueKbm: number = Number(
      combineInfo.reduce((acc: CombineDriverModel, curr: CombineDriverModel) =>
        Number(acc.driver.kbm) >= Number(curr.driver.kbm) ? acc : curr,
      ).driver.kbm,
    );

    //коэффициент на количество водителей
    const coefficientNumOfDrivers: number = 1 + combineInfo.length / 10;

    //финальный расчет
    return Math.round(BASE_PRICE * coefficientCity * maxValueKbm * maxCoefficientAgeStage * coefficientNumOfDrivers);
  }
}
