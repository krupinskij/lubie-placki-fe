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
  selector: 'controller',
  templateUrl: './controller.component.html',
  styleUrl: './controller.component.scss',
  imports: [ReactiveFormsModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Controller),
      multi: true,
    },
  ],
})
export class Controller implements ControlValueAccessor {
  label = input<string>('');
  placeholder = input<string>('');
  type = input<string>('text');
  control = input<AbstractControl | null>();

  value: string | number = '';
  disabled = false;

  onChange: (value: string | number) => void = noop;
  onTouch: () => void = noop;

  registerOnChange(fn: (value: string | number) => void): void {
    this.onChange = (value) => {
      fn(this.type() === 'number' ? Number(value) : value);
    };
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: number | string): void {
    if (this.type() === 'number') {
      this.value = Number(value);
    } else {
      this.value = value;
    }
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
