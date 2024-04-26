import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() public type: string = '';
  @Input() public label: string = '';
  @Input() public width: string = '';
  @Input() public placeholder: string = '';
  @Input() public marginLeft: string = '';
  @Input() public inputName: string = '';
  @Input() public InputValue: string = '';

  @Output() public onChange: EventEmitter<string> = new EventEmitter<string>();
}
