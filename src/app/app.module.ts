import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgStyle } from "@angular/common";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarInfoComponent } from './car-info/car-info.component';
import { KbmComponent } from './kbm/kbm.component';
import { DriversTableComponent } from './drivers-table/drivers-table/drivers-table.component';
import { AddDriverComponent } from './drivers-table/add-driver/add-driver.component';
import { ButtonComponent } from './shared/button/button.component';
import { InputComponent } from './shared/input/input.component';
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    CarInfoComponent,
    KbmComponent,
    DriversTableComponent,
    AddDriverComponent,
    ButtonComponent,
    InputComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgStyle
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
