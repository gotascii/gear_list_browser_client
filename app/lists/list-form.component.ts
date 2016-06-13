import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit
} from '@angular/core';
import {
  FORM_DIRECTIVES,
  FormBuilder,
  ControlGroup,
  Validators
} from '@angular/common';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: "list-form-component",
  template: `
  <form [ngFormModel]="form" (ngSubmit)="onSubmit()"  >
    <p>
      <input style="display: inline-block;" type="text" ngControl="name">
      <select ngControl="fromListId" class="form-control" style="width:auto; display: inline-block;">
        <option value=""></option>
        <option *ngFor="let list of lists$ | async" value="{{list.id}}">
          {{list.name}}
        </option>
      </select>
      <button type="submit" [disabled]="!form.valid">Submit</button>
    </p>
  </form>
  `,
  directives: [FORM_DIRECTIVES]
})
export class ListFormComponent {
  @Output() listFormSubmit:EventEmitter<string> = new EventEmitter<string>();
  @Input() lists$: Observable<any>;
  @Input() lists: Array<any>;
  form: ControlGroup;

  constructor(formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      "name": ["", Validators.required],
      "fromListId": [null]
    });
  }

  ngOnInit() {
    // debugger;
  }

  onSubmit() {
    this.listFormSubmit.emit(this.form.value);
  }
}
