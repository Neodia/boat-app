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

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    console.log(baseUrl);
    http.get<Boat[]>(baseUrl + 'api/boat').subscribe(r => { this.boats = r; this.selectedBoat = this.boats[1]; }, err => console.error(err));
  }

  getModal(boat: Boat): void {
    this.selectedBoat = boat;
    document.getElementById("modifyModal").style.display = "block";
  }

  hover(id: number): void {
    document.getElementById("modify-" + id).style.display = "block";
  }

  leave(id: number): void {
    document.getElementById("modify-" + id).style.display = "none";
  }

}