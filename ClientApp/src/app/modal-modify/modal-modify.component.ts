import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';


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

interface Boat {
  id: number;
  name: string;
  desc: string;
}
