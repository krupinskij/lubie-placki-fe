import { AsyncPipe } from '@angular/common';
import { Component, computed, forwardRef, input } from '@angular/core';
import {
  ReactiveFormsModule,
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  AbstractControl,
} from '@angular/forms';
import { noop } from 'rxjs';

@Component({
  selector: 'input-component',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  imports: [ReactiveFormsModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  label = input<string>('');
  placeholder = input<string>('');
  type = input<string>('text');
  control = input<AbstractControl | null>();

  value = '';
  disabled = false;

  onChange: (value: string) => void = noop;
  onTouch: () => void = noop;

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
    this.control()?.errors;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: string): void {
    this.value = value;
  }

  get isInvalid() {
    const ctrl = this.control();
    return ctrl?.invalid && (ctrl.dirty || ctrl.touched);
  }

  get errorMessage() {
    const ctrl = this.control();
    return ctrl?.errors?.['message'];
  }
}
