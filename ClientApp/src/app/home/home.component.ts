import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Boat } from '../boat'


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

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    console.log(baseUrl);
    http.get<Boat[]>(baseUrl + 'api/boat').subscribe(r => { this.boats = r; this.selectedBoat = this.boats[1]; }, err => console.error(err));
  }

  getModal(boat: Boat): void {
    this.selectedBoat = boat;
    document.getElementById("modifyModal").style.display = "block";
  }

  deleteBoat(boat: Boat): void {
    this.http.delete(this.baseUrl + "api/boat/" + boat.id).subscribe(r => {
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
      this.http.post(this.baseUrl + "api/boat", { name: name, desc: desc } as Boat).subscribe(r => {
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
