import { Component, ElementRef, EventEmitter, Inject, Input, Output, ViewChild } from '@angular/core';
import { ApiCaller } from '../api-caller.service';
import {Boat} from '../boat'


@Component({
  selector: 'modal-modify',
  templateUrl: './modal-modify.component.html',
})
export class ModalModifyComponent {

  @Input() boat: Boat;
  @Output() retboat: EventEmitter<Boat> = new EventEmitter<Boat>();
  @ViewChild('name', { static: false }) nameInput: ElementRef;
  @ViewChild('desc', { static: false }) descInput: ElementRef;

  constructor(private apiCaller: ApiCaller) { }

  saveChanges(): void {
    var newBoat: Boat = Object.assign({}, this.boat);
    newBoat.name = this.nameInput.nativeElement.value;
    newBoat.desc = this.descInput.nativeElement.value;
    this.apiCaller.updateBoat(newBoat).subscribe(r => {
      this.retboat.emit(newBoat);
      console.log("Success put");
      this.dismiss();
    }, err => console.error(err));
  }

  dismiss(): void {
    document.getElementById("modifyModal").style.display = "none";
  }

}
