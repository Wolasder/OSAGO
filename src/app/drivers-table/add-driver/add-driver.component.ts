import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DriverModel} from '../../shared/model/driver.model';
import {KbmModel} from '../../shared/model/kbm.model';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.scss'],
})
export class AddDriverComponent {
  @Output() public clickBtnCancel: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() public clickBtnAdd: EventEmitter<DriverModel> = new EventEmitter<DriverModel>();
  public driver: DriverModel = new DriverModel();
  public textBtnAdd: string = 'Добавить';
  public kbm: KbmModel[] = [
    {value: '1.17', description: '0 лет - КБМ 1.17'},
    {value: '1', description: '1 год - КБМ 1 (первый ОСАГО)'},
    {value: '0.91', description: '2 года - КБМ 0.91'},
    {value: '0.83', description: '3 года - КБМ 0.83'},
    {value: '0.78', description: '4 года - КБМ 0.78'},
    {value: '0.74', description: '5 лет - КБМ 0.74'},
    {value: '0.68', description: '6 лет - КБМ 0.68'},
    {value: '0.63', description: '7 лет - КБМ 0.63'},
    {value: '0.57', description: '8 лет - КБМ 0.57'},
    {value: '0.52', description: '9 лет - КБМ 0.52'},
    {value: '0.46', description: '10 и более лет - КБМ 0.46'},
  ];

  @Input()
  public set setDriver(driver: DriverModel) {
    if (!driver.isNew) {
      this.driver = driver;
      this.textBtnAdd = 'Сохранить';
    }
  }

  //закрывает форму добавления
  public clickButtonCancel(): void {
    this.clickBtnCancel.emit(false);
  }

  public clickButtonAdd(): void {
    //закрывает форму добавления
    this.clickBtnCancel.emit(false);

    //проверка на заполненность
    if (!this.driver.fio.length || !this.driver.age.length || !this.driver.stage.length) {
      alert('Заполните поля ввода данных');
    } else {
      this.driver.isNew = false;
      this.clickBtnAdd.emit(this.driver);
      //очищает форму
      this.driver = new DriverModel();
    }
  }
}
