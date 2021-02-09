import { Component, ElementRef, ViewChild } from '@angular/core';
import { Boat } from '../boat'
import { ApiCaller } from '../api-caller.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  public boats: Boat[];
  public selectedBoat: Boat;
  private createFormShown = false;
  private form: FormGroup;

  @ViewChild('bNameToAdd', { static: false }) private bNameToAdd: ElementRef;
  @ViewChild('bDescToAdd', { static: false }) private bDescToAdd: ElementRef;

  constructor(private fb: FormBuilder, private apiCaller: ApiCaller) {
    this.form = this.fb.group({
      inputBoatName: ['', Validators.required],
      inputBoatDesc: ['', Validators.required]
    });
    apiCaller.getBoats().subscribe(r => { this.boats = r; this.selectedBoat = this.boats[1]; }, err => console.error(err));
  }

  getModal(boat: Boat): void {
    this.selectedBoat = boat;
    document.getElementById("modifyModal").style.display = "block";
  }

  deleteBoat(boat: Boat): void {
    this.apiCaller.deleteBoat(boat.id.toString()).subscribe(r => {
      console.log("Success delete");
      this.boats.splice(this.boats.indexOf(boat), 1);
    }, err => console.error(err));
  }

  onSaveChanges(boat: Boat): void {
    this.boats[this.boats.indexOf(this.selectedBoat)] = boat;
  }

  hover(id: number): void {
    document.getElementById("modify-" + id).style.display = "inline-block";
    document.getElementById("delete-" + id).style.display = "inline-block";
  }

  leave(id: number): void {
    document.getElementById("modify-" + id).style.display = "none";
    document.getElementById("delete-" + id).style.display = "none";
  }

  showCreateForm(): void {
    this.createFormShown = !this.createFormShown;
  }

  createBoat(): void {
    const val = this.form.value;

    if (!this.form.valid)
      alert("Please enter values."); // Change to message
    else {
      this.apiCaller.addBoat(val.inputBoatName, val.inputBoatDesc).subscribe(r => {
        this.boats.push(r['obj'] as Boat)
        this.cleanAddInputs();
        this.showCreateForm();
      }, err => console.error(err));
    }
  }

  cleanAddInputs(): void {
    const val = this.form.value;
    this.form.reset(val.inputBoatName);
    this.form.reset(val.inputBoatDesc);
  }

}
