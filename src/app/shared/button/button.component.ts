import {Component, EventEmitter, Input, Output,} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() public text: string = 'Добавить водителя';
  @Input() public padding: string = '';

  @Input() public disableBtn: boolean = false;
  @Output() public clickBtn: EventEmitter<boolean> = new EventEmitter<boolean>();

  public clickButton():void {
    this.clickBtn.emit(true)
  }


}
