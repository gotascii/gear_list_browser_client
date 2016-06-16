import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy
} from '@angular/core';
import {
  FORM_DIRECTIVES,
  FormBuilder,
  ControlGroup,
  Validators
} from '@angular/common';
import { Observable, Subscription } from 'rxjs/Rx';

declare var jQuery:any;

@Component({
  selector: "item-form-component",
  templateUrl: 'app/items/item-form.component.html',
  styles: [`
    div.row.valign-wrapper {
      margin-bottom: 0;
    }
  `],
  directives: [FORM_DIRECTIVES]
})
export class ItemFormComponent {
  @Output() itemFormSubmit:EventEmitter<string> = new EventEmitter<string>();
  @Input() functions$: Observable<any>;
  form: ControlGroup;
  functions: Array<any>;
  subscription: Subscription;

  constructor(formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      "name": ["", Validators.required],
      "weight": ["", Validators.required],
      "functionId": ["", Validators.required]
    });
  }

  ngOnInit() {
    this.subscription = this.functions$.subscribe((functions) => {
      this.functions = functions;
      jQuery('select').material_select();
    });
  }

  onSubmit() {
    this.itemFormSubmit.emit(this.form.value);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

