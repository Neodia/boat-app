import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Boat } from '../boat'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  public boats: Boat[];
  public selectedBoat: Boat;

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

}
