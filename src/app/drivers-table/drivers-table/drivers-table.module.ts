import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DriversTableComponent} from './drivers-table.component';
import {ButtonModule} from '../../shared/button/button.module';

@NgModule({
  declarations: [DriversTableComponent],
  imports: [CommonModule, ButtonModule],
  exports: [DriversTableComponent],
})
export class DriversTableModule {}
