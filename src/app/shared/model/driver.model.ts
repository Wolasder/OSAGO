export class DriverModel {
  public isNew: boolean;
  public fio: string;
  public age: string;
  public stage: string;
  public kbm: string;
  public kas: number;


  constructor() {
    this.isNew = true;
    this.fio = '';
    this.age = '';
    this.stage = '';
    this.kbm = '';
    this.kas = 0;
  }
}
