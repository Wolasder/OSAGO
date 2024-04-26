import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DriverModel} from '../../shared/model/driver.model';

@Component({
  selector: 'app-drivers-table',
  templateUrl: './drivers-table.component.html',
  styleUrls: ['./drivers-table.component.scss'],
})
export class DriversTableComponent {
  @Input() public driverData: DriverModel[] = [];

  @Output() public editableDriver: EventEmitter<{ driver: DriverModel; index: number }> = new EventEmitter<{
    driver: DriverModel;
    index: number;
  }>();
  @Output() public deleteDriverEvent: EventEmitter<void> = new EventEmitter<void>();

  protected titleDriversTable: string = 'Таблица водителей';

  protected deleteDriver(index: number): void {
    this.driverData.splice(index, 1);
    localStorage.setItem('key', JSON.stringify(this.driverData));
    this.deleteDriverEvent.emit();
  }

  protected changeDriverDblclick(driver: DriverModel, index: number): void {
    this.editableDriver.emit({driver: driver, index: index});
  }
}
