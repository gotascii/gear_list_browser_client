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
  selector: "pick-form-component",
  templateUrl: 'app/picks/pick-form.component.html',
  directives: [FORM_DIRECTIVES]
})
export class PickFormComponent {
  @Output() pickFormSubmit:EventEmitter<string> = new EventEmitter<string>();
  @Input() items$: Observable<any>;
  form: ControlGroup;

  constructor(formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      "itemId": ["", Validators.required],
      "packed": [false]
    });
  }

  onSubmit() {
    this.pickFormSubmit.emit(this.form.value);
  }
}
