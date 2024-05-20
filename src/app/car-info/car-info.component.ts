import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {CarGosNumber, CarInfoModel} from '../shared/model/car-info.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {filter, Subject, takeUntil} from 'rxjs';

type carInfoWithoutGosNum = Omit<CarInfoModel, 'gosNumber'>;
type carGosNumberWithoutView = Omit<CarGosNumber, 'view'>;
type formGroupGosNumberType = {
  [property in keyof carGosNumberWithoutView]: FormControl<carGosNumberWithoutView[property]>;
};
type formGroupCarInfoModelType = {gosNumber: FormGroup<formGroupGosNumberType>} & {
  [property in keyof carInfoWithoutGosNum]: FormControl<carInfoWithoutGosNum[property]>;
};

@Component({
  selector: 'app-car-info',
  templateUrl: './car-info.component.html',
  styleUrls: ['./car-info.component.scss'],
})
export class CarInfoComponent implements OnInit, OnDestroy {
  @Output() public carInfoChange: EventEmitter<CarInfoModel> = new EventEmitter<CarInfoModel>();

  protected carInfo: CarInfoModel = new CarInfoModel();
  protected titleCarInfo: string = 'Данные об автомобиле';
  private readonly unsubscribe$: Subject<void> = new Subject();

  protected formGroup: FormGroup = new FormGroup<formGroupCarInfoModelType>({
    city: new FormControl(null, [Validators.required]),
    model: new FormControl(null, [Validators.required]),
    gosNumber: new FormGroup<formGroupGosNumberType>({
      number: new FormControl(null, [Validators.required]),
      region: new FormControl(null, [Validators.required]),
      country: new FormControl(null, [Validators.required]),
    }),
    vin: new FormControl(null, [Validators.required]),
  });

  ngOnInit(): void {
    this.formGroup.valueChanges
      .pipe(
        filter(() => this.formGroup.valid),
        takeUntil(this.unsubscribe$),
      )
      .subscribe(() => this.carInfoChange.emit(this.formGroup.getRawValue()));
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
