import { Component, ElementRef, ViewChild } from '@angular/core';
import { Boat } from '../boat'
import { ApiCaller } from '../api-caller.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  public boats: Boat[];
  public selectedBoat: Boat;
  private createFormShown = false;
  @ViewChild('bNameToAdd', { static: false }) private bNameToAdd: ElementRef;
  @ViewChild('bDescToAdd', { static: false }) private bDescToAdd: ElementRef;

  constructor(private apiCaller: ApiCaller) {
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
    var name = this.bNameToAdd.nativeElement.value;
    var desc = this.bDescToAdd.nativeElement.value;
    if (name == "" || desc == "")
      alert("Please enter values."); // Change to message
    else {
      this.apiCaller.addBoat(name, desc).subscribe(r => {
        this.boats.push(r['obj'] as Boat)
        this.cleanAddInputs();
        this.showCreateForm();
      }, err => console.error(err));
    }
  }

  cleanAddInputs(): void {
    this.bNameToAdd.nativeElement.value = "";
    this.bDescToAdd.nativeElement.value = "";
  }

}
