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
import { MaterializeDirective } from "angular2-materialize";

@Component({
  selector: "list-form-component",
  templateUrl: 'app/lists/list-form.component.html',
  directives: [FORM_DIRECTIVES, MaterializeDirective]
})
export class ListFormComponent {
  @Output() listFormSubmit:EventEmitter<string> = new EventEmitter<string>();
  @Input() lists$: Observable<any>;
  form: ControlGroup;

  constructor(formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      "name": ["", Validators.required],
      "fromListId": [null]
    });
  }

  onSubmit() {
    this.listFormSubmit.emit(this.form.value);
  }
}
