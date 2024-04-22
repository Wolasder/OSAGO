import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DriverModel} from '../../shared/model/driver.model';

@Component({
  selector: 'app-drivers-table',
  templateUrl: './drivers-table.component.html',
  styleUrls: ['./drivers-table.component.scss'],
})
export class DriversTableComponent {
  @Input() public driverInfoInTable: DriverModel[] = [];

  @Output() public changeTableDriver: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() public changeDriverInput: EventEmitter<{driver: DriverModel; index: number}> = new EventEmitter<{
    driver: DriverModel;
    index: number;
  }>();
  @Output() public deleteDriverEv: EventEmitter<void> = new EventEmitter<void>();

  public titleH2: string = 'Таблица водителей';

  public deleteDriver(index: number): void {
    this.driverInfoInTable.splice(index, 1);
    localStorage.setItem('key', JSON.stringify(this.driverInfoInTable));
    this.deleteDriverEv.emit();
  }

  public changeDriverDblclick(driver: DriverModel, index: number): void {
    this.changeTableDriver.emit(true);

    this.changeDriverInput.emit({driver: driver, index: index});
  }
}
