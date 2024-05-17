import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {CarInfoModel} from '../shared/model/car-info.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {filter, Subject, takeUntil} from 'rxjs';

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

  protected formGroup: FormGroup = new FormGroup({
    city: new FormControl(null, [Validators.required]),
    model: new FormControl('', [Validators.required]),
    gosNumber: new FormGroup({
      number: new FormControl('', [Validators.required]),
      region: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
    }),
    vin: new FormControl('', [Validators.required]),
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
