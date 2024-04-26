import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CarInfoComponent} from './car-info.component';
import {FormsModule} from '@angular/forms';
import {InputModule} from '../shared/input/input.module';
import {TitleH2Module} from '../title-h2/title-h2.module';

@NgModule({
  declarations: [CarInfoComponent],
  imports: [CommonModule, FormsModule, InputModule, TitleH2Module],
  exports: [CarInfoComponent],
})
export class CarInfoModule {}
