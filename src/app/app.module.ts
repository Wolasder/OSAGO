import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule, NgFor, NgStyle} from '@angular/common';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CarInfoComponent} from './car-info/car-info.component';
import {KbmComponent} from './kbm/kbm.component';
import {DriversTableComponent} from './drivers-table/drivers-table/drivers-table.component';
import {AddDriverComponent} from './drivers-table/add-driver/add-driver.component';
import {ButtonComponent} from './shared/button/button.component';
import {InputComponent} from './shared/input/input.component';
import {FormsModule} from '@angular/forms';
import {LocalStorageService} from './services/local-storage.service';
import {TitleH1Component} from './title-h1/title-h1.component';
import {TitleH2Component} from './title-h2/title-h2.component';
import {CarInfoModule} from './car-info/car-info.module';
import {AddDriverModule} from './drivers-table/add-driver/add-driver.module';
import {InputModule} from './shared/input/input.module';
import {ButtonModule} from './shared/button/button.module';
import {KbmModule} from './kbm/kbm.module';
import {TitleH1Module} from './title-h1/title-h1.module';
import {TitleH2Module} from './title-h2/title-h2.module';
import {DriversTableModule} from './drivers-table/drivers-table/drivers-table.module';
@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    CarInfoModule,
    KbmModule,
    DriversTableModule,
    AddDriverModule,
    ButtonModule,
    TitleH1Module,
    TitleH2Module,
  ],
  providers: [LocalStorageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
