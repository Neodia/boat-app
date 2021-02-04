import { Component, Input } from '@angular/core';
import {Boat} from '../boat'


@Component({
  selector: 'modal-modify',
  templateUrl: './modal-modify.component.html',
})
export class ModalModifyComponent {

  @Input() boat: Boat = { name : "" } as Boat;

  dismiss(): void {
    document.getElementById("modifyModal").style.display = "none";
  }

}
