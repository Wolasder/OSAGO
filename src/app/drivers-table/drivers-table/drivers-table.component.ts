import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output} from '@angular/core';
import {DriverModel} from '../../shared/model/driver.model';
import {IEditableDriver} from '../../shared/interface/editable-driver.interface';
import {LocalStorageService} from '../../services/local-storage.service';

@Component({
  selector: 'app-drivers-table',
  templateUrl: './drivers-table.component.html',
  styleUrls: ['./drivers-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DriversTableComponent {
  @Input() public driverData: DriverModel[] = [];

  @Output() public editableDriver: EventEmitter<IEditableDriver> = new EventEmitter<IEditableDriver>();
  @Output() public deleteDriverEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(private readonly localStorageService: LocalStorageService) {}

  protected deleteDriver(index: number): void {
    this.driverData.splice(index, 1);
    this.localStorageService.drivers = this.driverData;
    this.deleteDriverEvent.emit();
  }

  protected changeDriverDblclick(driver: DriverModel, index: number): void {
    this.editableDriver.emit({driver: driver, index: index});
  }
}
