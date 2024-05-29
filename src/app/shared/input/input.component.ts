import {Component, Input, OnDestroy, OnInit, Optional, Self} from '@angular/core';
import {ControlValueAccessor, FormControl, NgControl} from '@angular/forms';
import {distinctUntilChanged, Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent<T> implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() public type: string = '';
  @Input() public label: string = '';
  @Input() public width: string = '';
  @Input() public placeholder: string = '';
  @Input() public marginLeft: string = '';
  @Input() public inputName: string = '';
  @Input() public required: boolean = true;
  @Input() public visibleErrorHint: boolean = true;

  protected formControl: FormControl = new FormControl<T | null>(null);
  private onChangeCallback!: (_: T) => {};
  private onTouchedCallBack!: () => {};
  private readonly unsubscribe$: Subject<void> = new Subject();

  constructor(@Self() @Optional() public readonly control: NgControl) {
    this.control.valueAccessor = this;
  }

  public ngOnInit(): void {
    this.formControl.valueChanges.pipe(distinctUntilChanged(), takeUntil(this.unsubscribe$)).subscribe((value: T) => {
      this.onReactiveChange(value);
    });
  }

  public get invalid(): boolean | null {
    return this.control ? this.control.invalid : false;
  }

  public get showError(): boolean | null {
    if (!this.control) {
      return false;
    }

    const {dirty, touched} = this.control;

    return this.visibleErrorHint && this.invalid ? dirty || touched : false;
  }

  private onReactiveChange(value: T): void {
    if (this.onChangeCallback) {
      this.onChangeCallback(value);
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallBack = fn;
  }

  public onTouch(): void {
    if (this.onTouchedCallBack) {
      this.onTouchedCallBack();
    }
  }

  writeValue(obj: T): void {
    this.formControl.setValue(obj);
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
