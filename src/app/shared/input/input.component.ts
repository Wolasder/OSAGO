import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() type: string = '';
  @Input() label: string = '';
  @Input() width: string = '';
  @Input() placeholder: string = '';
  @Input() marginLeft: string = '';
  @Input() inputName: string = '';
  @Input() myInputValue: string = '';

  @Output() public onChange: EventEmitter<string> = new EventEmitter<string>();
}

//
//
// import {Component, forwardRef, Input} from '@angular/core';
// import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
//
// @Component({
//   selector: 'app-input',
//   templateUrl: './input.component.html',
//   providers: [{
//     provide: NG_VALUE_ACCESSOR,
//     useExisting: forwardRef(() => InputComponent),
//     multi: true
//   }],
//   styleUrls: ['./input.component.scss']
// })
// export class InputComponent implements ControlValueAccessor{
//   @Input() type: string = '';
//   @Input() label: string = '';
//   @Input() width: string = '';
//   @Input() placeholder: string = '';
//   @Input() marginLeft: string = '';
//
//   public value: string = ''
//
//   private onChange(_: any) {}
//
//   private onTouched(_: any) {}
//
//   public changeValue(event: string) {
//     this.writeValue(event);
//     this.onChange;
//   }
//
//   public writeValue(value: any): void {
//     this.value = value;
//   }
//
//   public registerOnChange(fn: (_: any) => void): void {
//     this.onChange = fn;
//   }
//
//   registerOnTouched(fn: any): void {
//     this.onTouched = fn;
//   }
// }
