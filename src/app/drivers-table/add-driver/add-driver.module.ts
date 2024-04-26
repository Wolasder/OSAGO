import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddDriverComponent} from './add-driver.component';
import {FormsModule} from '@angular/forms';
import {InputModule} from '../../shared/input/input.module';
import {ButtonModule} from '../../shared/button/button.module';

@NgModule({
  declarations: [AddDriverComponent],
  imports: [CommonModule, FormsModule, InputModule, ButtonModule],
  exports: [AddDriverComponent],
})
export class AddDriverModule {}
