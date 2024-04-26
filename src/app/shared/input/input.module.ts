import {NgModule} from '@angular/core';
import {CommonModule, NgFor, NgStyle} from '@angular/common';
import {InputComponent} from './input.component';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
  declarations: [InputComponent],
  imports: [CommonModule, FormsModule],
  exports: [InputComponent],
})
export class InputModule {}
