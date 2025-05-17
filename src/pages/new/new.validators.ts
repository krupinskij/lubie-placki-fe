import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function required(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = !control.value;
    return forbidden ? { message: 'To pole jest wymagane.' } : null;
  };
}

export function min(min: number): ValidatorFn {
  return (control: AbstractControl<number>): ValidationErrors | null => {
    const forbidden = control.value < min;
    return forbidden
      ? { message: `Wartość pola nie powinna być mniejsza niż ${min}.` }
      : null;
  };
}

export function max(max: number): ValidatorFn {
  return (control: AbstractControl<number>): ValidationErrors | null => {
    const forbidden = control.value > max;
    return forbidden
      ? { message: `Wartość pola nie powinna być większa niż ${max}.` }
      : null;
  };
}

export function minStrLength(min: number): ValidatorFn {
  return (control: AbstractControl<string>): ValidationErrors | null => {
    const forbidden = control.value.length < min;
    return forbidden
      ? { message: `Długość pola nie powinna być krótsza niż ${min}.` }
      : null;
  };
}

export function maxStrLength(max: number): ValidatorFn {
  return (control: AbstractControl<string>): ValidationErrors | null => {
    const forbidden = control.value.length > max;
    return forbidden
      ? { message: `Długość pola nie powinna być dłuższa niż ${max}.` }
      : null;
  };
}

export function minArrayLength(min: number): ValidatorFn {
  return (control: AbstractControl<unknown[]>): ValidationErrors | null => {
    const forbidden = control.value.length < min;
    return forbidden
      ? { message: `Powinno być co najmniej ${min} elementów.` }
      : null;
  };
}

export function maxArrayLength(max: number): ValidatorFn {
  return (control: AbstractControl<unknown[]>): ValidationErrors | null => {
    const forbidden = control.value.length > max;
    return forbidden
      ? { message: `Powinno być najwyżej ${max} elementów.` }
      : null;
  };
}
