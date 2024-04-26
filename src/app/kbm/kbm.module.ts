import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {KbmComponent} from './kbm.component';
import {ButtonModule} from '../shared/button/button.module';
import {TitleH2Module} from '../title-h2/title-h2.module';

@NgModule({
  declarations: [KbmComponent],
  imports: [CommonModule, ButtonModule, TitleH2Module],
  exports: [KbmComponent],
})
export class KbmModule {}
