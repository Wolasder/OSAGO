export class DriverModel {
  public isNew: boolean | null;
  public fio: string | null;
  public age: string | null;
  public stage: string | null;
  public kbm: string | null;
  public coefficientAgeStage: number;

  constructor() {
    this.isNew = true;
    this.fio = '';
    this.age = '';
    this.stage = '';
    this.kbm = '';
    this.coefficientAgeStage = 0;
  }
}
