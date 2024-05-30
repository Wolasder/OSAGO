import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {CombineDriverModel} from '../shared/model/combine-driver.model';
import {KbmLogicService} from '../services/kbm-logic.service';

@Component({
  selector: 'app-kbm',
  templateUrl: './kbm.component.html',
  styleUrls: ['./kbm.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [KbmLogicService],
})
export class KbmComponent {
  @Input() public combineInfo: CombineDriverModel[] = [];
  @Output() public markAllTouched: EventEmitter<void> = new EventEmitter<void>()

  protected hiddenTable: boolean = true;
  protected finalPrice: number = 0;

  constructor(private readonly kbmLogicService: KbmLogicService) {}

  protected GetPrice() {
    if (this.combineInfo[0]?.carInfo && this.combineInfo[0]?.driver) {
      this.hiddenTable = false;
      this.finalPrice = this.kbmLogicService.calcPrice(this.combineInfo);
    } else {
      this.markAllTouched.emit()
    }
  }
}
