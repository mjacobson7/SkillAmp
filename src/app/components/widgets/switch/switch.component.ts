import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: SwitchComponent, multi: true }
  ]
})
export class SwitchComponent implements ControlValueAccessor {
  @Input() active: boolean = true;
  
  private onChange: (value: boolean) => void

  selectValue() {
    this.active = !this.active;
    this.onChange(this.active);
  }
  
  writeValue(value: boolean) { 
    this.active = value;
  }

  registerOnChange(onChange: (value: boolean) => void) {
    this.onChange = onChange;
  }

  registerOnTouched() { }

}
