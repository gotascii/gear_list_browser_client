import {
  Component,
  Renderer,
  ElementRef,
  Directive,
  Input
} from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Directive({
  selector : 'input'
})
class InplaceInput {
  constructor(
    private renderer: Renderer,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    let element = this.elementRef.nativeElement;
    this.renderer.invokeElementMethod(element, 'focus', []);
  }
}

@Component({
  selector: 'tr[item]',
  templateUrl: 'app/items/item-row.component.html',
  styles:[`
    div.inplace-editable:hover {
      background-color: lightyellow;
    }
    input.inplace-editable {
      width: 100%;
      background-color: lightyellow;
    }
  `],
  directives: [InplaceInput]
})
export class ItemRowComponent {
  static documentClickHandled = false;
  static activeElement = null;

  @Input() item: any;
  @Input() functions$: Observable<any>;
  editStateManager;

  constructor(renderer: Renderer) {
    if(!ItemRowComponent.documentClickHandled) {
      renderer.listenGlobal(
        'document',
        'click',
        ItemRowComponent.onClickDocument
      );
      ItemRowComponent.documentClickHandled = true;
    }

    // Use the component class itself to manage global edit state.
    this.editStateManager = ItemRowComponent;
  }

  static onClickDocument($event) {
    ItemRowComponent.activeElement = null;
    $event.stopPropagation();
  }

  onClickItemAttr($event) {
    ItemRowComponent.activeElement = $event.target.parentElement;
    $event.stopPropagation();
  }

  onClickItemAttrEdit($event) {
    $event.stopPropagation();
  }

}

