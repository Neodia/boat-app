import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Inject, Input, Output, ViewChild } from '@angular/core';
import {Boat} from '../boat'


@Component({
  selector: 'modal-modify',
  templateUrl: './modal-modify.component.html',
})
export class ModalModifyComponent {

  @Input() boat: Boat = { name: "" } as Boat;
  @Output() retboat: EventEmitter<Boat> = new EventEmitter<Boat>();
  @ViewChild('name') nameInput: ElementRef;
  @ViewChild('desc') descInput: ElementRef;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {}

  saveChanges(): void {
    var newBoat: Boat = Object.assign({}, this.boat);
    newBoat.name = this.nameInput.nativeElement.value;
    newBoat.desc = this.descInput.nativeElement.value;
    this.http.put(this.baseUrl + 'api/boat/' + newBoat.id, newBoat).subscribe(r => {
      this.retboat.emit(newBoat);
      console.log("Success put");
      this.dismiss();
    }, err => console.error(err));
  }

  dismiss(): void {
    document.getElementById("modifyModal").style.display = "none";
  }

}
