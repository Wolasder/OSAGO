import {FormControl, FormGroup} from "@angular/forms";

export function markAllFormFieldsAsTouchedFunction(formGroup: FormGroup): void {
  (<any>Object).values(formGroup.controls).forEach((control: any) => {
    if (control instanceof FormControl) {
      control.markAsTouched({onlySelf: true});
      control.updateValueAndValidity({emitEvent: false});
    }
    if (control instanceof FormGroup) {
      markAllFormFieldsAsTouchedFunction(control);
    }
  });
}
