import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DriversTableComponent} from './drivers-table.component';
import {ButtonModule} from '../../shared/button/button.module';
import {TitleH2Module} from '../../title-h2/title-h2.module';

@NgModule({
  declarations: [DriversTableComponent],
  imports: [CommonModule, ButtonModule, TitleH2Module],
  exports: [DriversTableComponent],
})
export class DriversTableModule {}
