import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DriverModel} from '../../shared/model/driver.model';
import {KbmModel} from '../../shared/model/kbm.model';
import {KBM} from '../../kbm/kmb';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject, takeUntil} from 'rxjs';

type carGosNumberWithoutView = Omit<DriverModel, 'isNew' | 'coefficientAgeStage'>;
type formGroupDriverModelType = {
  [property in keyof carGosNumberWithoutView]: FormControl<carGosNumberWithoutView[property]>;
};

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.scss'],
})
export class AddDriverComponent {
  @Output() public clickBtnCancel: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() public clickBtnAdd: EventEmitter<DriverModel> = new EventEmitter<DriverModel>();
  protected driver: DriverModel = new DriverModel();
  protected kbm: KbmModel[] = KBM;
  private readonly unsubscribe$: Subject<void> = new Subject();

  @Input()
  public set setDriver(driver: DriverModel) {
    if (!driver.isNew) {
      this.driver = driver;
      this.formGroup.patchValue(driver);
    }
  }

  protected formGroup: FormGroup = new FormGroup<formGroupDriverModelType>({
    fio: new FormControl(null, [Validators.required]),
    age: new FormControl(null, [Validators.required, Validators.min(16)]),
    stage: new FormControl(null, [Validators.required]),
    kbm: new FormControl(null, [Validators.required]),
  });

  ngOnInit(): void {
    this.formGroup.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe();
  }

  //закрывает форму добавления
  protected clickButtonCancel(): void {
    this.clickBtnCancel.emit(false);
  }

  protected clickButtonAdd(): void {
    if (this.formGroup.valid) {
      this.clickBtnAdd.emit(this.formGroup.getRawValue());
      //очищает форму
      this.formGroup.reset(new DriverModel());
      //закрывает форму
      this.clickBtnCancel.emit(false);
    } else {
      alert('Всё заполни и возраст от 16ти лет');
    }
    this.driver.isNew = false;
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
