import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {KbmComponent} from './kbm.component';
import {ButtonModule} from '../shared/button/button.module';

@NgModule({
  declarations: [KbmComponent],
  imports: [CommonModule, ButtonModule],
  exports: [KbmComponent],
})
export class KbmModule {}
