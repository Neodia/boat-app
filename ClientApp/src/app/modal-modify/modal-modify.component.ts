import { Component, ElementRef, EventEmitter, Inject, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiCaller } from '../api-caller.service';
import {Boat} from '../boat'


@Component({
  selector: 'modal-modify',
  templateUrl: './modal-modify.component.html',
})
export class ModalModifyComponent {

  private form: FormGroup;
  @Input() boat: Boat;

  // Used to detect when Boat gets a value to properly initialize the form.
  ngOnChanges(changes: SimpleChanges) {
    if (changes.boat.currentValue) {
      this.form = this.fb.group({
        inputBoatName: [changes.boat.currentValue.name, Validators.required],
        inputBoatDesc: [changes.boat.currentValue.desc, Validators.required]
      });
    }
  }

  @Output() retboat: EventEmitter<Boat> = new EventEmitter<Boat>();

  constructor(private fb: FormBuilder, private apiCaller: ApiCaller) {}

  saveChanges(): void {
    var newBoat: Boat = Object.assign({}, this.boat);
    const val = this.form.value;

    if (this.form.valid) {
      newBoat.name = val.inputBoatName;
      newBoat.desc = val.inputBoatDesc;
      this.apiCaller.updateBoat(newBoat).subscribe(r => {
        this.retboat.emit(newBoat);
        console.log("Success put");
        this.dismiss();
      }, err => console.error(err));
    }
  }

  dismiss(): void {
    document.getElementById("modifyModal").style.display = "none";
  }

}
