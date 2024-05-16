import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {AppComponent} from './app.component';
import {LocalStorageService} from './services/local-storage.service';
import {CarInfoModule} from './car-info/car-info.module';
import {AddDriverModule} from './drivers-table/add-driver/add-driver.module';
import {ButtonModule} from './shared/button/button.module';
import {KbmModule} from './kbm/kbm.module';
import {TitleH1Module} from './title-h1/title-h1.module';
import {TitleH2Module} from './title-h2/title-h2.module';
import {DriversTableModule} from './drivers-table/drivers-table/drivers-table.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

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
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [LocalStorageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
