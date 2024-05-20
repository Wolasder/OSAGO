import {Component, forwardRef, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent<T> implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() public type: string = '';
  @Input() public label: string = '';
  @Input() public width: string = '';
  @Input() public placeholder: string = '';
  @Input() public marginLeft: string = '';
  @Input() public inputName: string = '';

  protected formControl: FormControl = new FormControl<T | null>(null);
  private onChangeCallback!: (_: T) => {};
  private readonly unsubscribe$: Subject<void> = new Subject();

  public ngOnInit(): void {
    this.formControl.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe((value: T) => {
      this.onReactiveChange(value);
    });
  }

  private onReactiveChange(value: T): void {
    if (this.onChangeCallback) {
      this.onChangeCallback(value);
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {}

  writeValue(obj: T): void {
    this.formControl.setValue(obj, {emitEvent: false});
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
