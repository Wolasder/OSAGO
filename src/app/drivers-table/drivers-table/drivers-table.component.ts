import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DriverModel} from '../../shared/model/driver.model';
import {IEditableDriver} from '../../shared/interface/editable-driver.interface';

@Component({
  selector: 'app-drivers-table',
  templateUrl: './drivers-table.component.html',
  styleUrls: ['./drivers-table.component.scss'],
})
export class DriversTableComponent {
  @Input() public driverData: DriverModel[] = [];

  @Output() public editableDriver: EventEmitter<IEditableDriver> = new EventEmitter<IEditableDriver>();
  @Output() public deleteDriverEvent: EventEmitter<void> = new EventEmitter<void>();

  protected deleteDriver(index: number): void {
    this.driverData.splice(index, 1);
    localStorage.setItem('key', JSON.stringify(this.driverData));
    this.deleteDriverEvent.emit();
  }

  protected changeDriverDblclick(driver: DriverModel, index: number): void {
    this.editableDriver.emit({driver: driver, index: index});
  }
}
