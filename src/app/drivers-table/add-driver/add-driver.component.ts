import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DriverModel} from '../../shared/model/driver.model';
import {KbmModel} from '../../shared/model/kbm.model';
import {KBM} from "../../kbm/kmb";

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.scss'],
})
export class AddDriverComponent {
  @Output() public clickBtnCancel: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() public clickBtnAdd: EventEmitter<DriverModel> = new EventEmitter<DriverModel>();
  protected driver: DriverModel = new DriverModel();
  protected kbm: KbmModel[] = KBM;

  @Input()
  public set setDriver(driver: DriverModel) {
    if (!driver.isNew) {
      this.driver = driver;
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
