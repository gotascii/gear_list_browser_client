import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import {
  FORM_DIRECTIVES,
  FormBuilder,
  ControlGroup,
  Validators
} from '@angular/common';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: "item-form-component",
  templateUrl: 'app/items/item-form.component.html',
  directives: [FORM_DIRECTIVES]
})
export class ItemFormComponent {
  @Output() itemFormSubmit:EventEmitter<string> = new EventEmitter<string>();
  @Input() functions$: Observable<any>;
  form: ControlGroup;

  constructor(formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      "name": ["", Validators.required],
      "weight": ["", Validators.required],
      "functionId": ["", Validators.required]
    });
  }

  onSubmit() {
    this.itemFormSubmit.emit(this.form.value);
  }
}

