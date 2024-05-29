import {Component, Input} from '@angular/core';
import {CombineDriverModel} from '../shared/model/combine-driver.model';
import {KbmLogicService} from '../services/kbm-logic.service';

@Component({
  selector: 'app-kbm',
  templateUrl: './kbm.component.html',
  styleUrls: ['./kbm.component.scss'],
  providers: [KbmLogicService],
})
export class KbmComponent {
  constructor(private readonly kbmLogicService: KbmLogicService) {}

  @Input() public combineInfo: CombineDriverModel[] = [];
  protected hiddenTable: boolean = true;
  protected finalPrice: number = 0;

  protected GetPrice() {
    this.hiddenTable = false;
    this.finalPrice = this.kbmLogicService.calcPrice(this.combineInfo);
  }
}
