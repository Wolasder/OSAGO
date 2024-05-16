import {Component, ElementRef, EventEmitter, HostListener, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {CarInfoModel} from '../shared/model/car-info.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject, takeUntil, tap} from 'rxjs';

@Component({
  selector: 'app-car-info',
  templateUrl: './car-info.component.html',
  styleUrls: ['./car-info.component.scss'],
})
export class CarInfoComponent implements OnInit, OnDestroy {
  @Output() public carInfoChange: EventEmitter<CarInfoModel> = new EventEmitter<CarInfoModel>();

  @HostListener('document:click', ['$event.target'])
  private onClick(targetElement: any): void {
    if (!this.carInfoElem.nativeElement.contains(targetElement) && this.formGroup.valid && this.needEmit) {
      this.carInfoChange.emit(this.formGroup.getRawValue());
      this.needEmit = false;
      console.log(this.formGroup.value);
    }
  }

  @ViewChild('carInfo') public carInfoElem: ElementRef;

  protected carInfo: CarInfoModel = new CarInfoModel();
  protected titleCarInfo: string = 'Данные об автомобиле';
  private readonly unsubscribe$: Subject<void> = new Subject();
  private needEmit: boolean = false;

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
        tap(() => (this.needEmit = true)),
        takeUntil(this.unsubscribe$),
      )
      .subscribe();
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
