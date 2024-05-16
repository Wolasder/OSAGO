import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CarInfoComponent} from './car-info.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputModule} from '../shared/input/input.module';
import {TitleH2Module} from '../title-h2/title-h2.module';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [CarInfoComponent],
  imports: [CommonModule, FormsModule, InputModule, TitleH2Module, ReactiveFormsModule, HttpClientModule],
  exports: [CarInfoComponent],
})
export class CarInfoModule {}
