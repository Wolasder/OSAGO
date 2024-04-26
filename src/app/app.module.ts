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
export class AppModule {
}
