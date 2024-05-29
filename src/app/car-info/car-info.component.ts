import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {CarGosNumber, CarInfoModel} from '../shared/model/car-info.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {filter, Subject, takeUntil} from 'rxjs';

type CarInfoWithoutGosNum = Omit<CarInfoModel, 'gosNumber'>;
type CarGosNumberWithoutView = Omit<CarGosNumber, 'view'>;
type FormGroupGosNumberType = {
  [property in keyof CarGosNumberWithoutView]: FormControl<CarGosNumberWithoutView[property]>;
};
type FormGroupCarInfoModelType = {gosNumber: FormGroup<FormGroupGosNumberType>} & {
  [property in keyof CarInfoWithoutGosNum]: FormControl<CarInfoWithoutGosNum[property]>;
};

@Component({
  selector: 'app-car-info',
  templateUrl: './car-info.component.html',
  styleUrls: ['./car-info.component.scss'],
})
export class CarInfoComponent implements OnInit, OnDestroy {
  @Output() public carInfoChange: EventEmitter<CarInfoModel> = new EventEmitter<CarInfoModel>();

  protected carInfo: CarInfoModel = new CarInfoModel();
  private readonly unsubscribe$: Subject<void> = new Subject();

  protected formGroup: FormGroup<FormGroupCarInfoModelType> = new FormGroup<FormGroupCarInfoModelType>({
    city: new FormControl(null, [Validators.required]),
    model: new FormControl(null, [Validators.required]),
    gosNumber: new FormGroup<FormGroupGosNumberType>({
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
      .subscribe(() => {
        this.carInfoChange.emit(<CarInfoModel>this.formGroup.getRawValue());
      });
  }

  public get showGroupGosNumError(): boolean | null {
    const {dirty, touched} = this.formGroup.controls.gosNumber;

    return this.formGroup.controls.gosNumber.invalid ? dirty || touched : false;
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
