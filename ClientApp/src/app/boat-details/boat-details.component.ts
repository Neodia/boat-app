import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Boat } from '../boat'
import { ApiCaller } from '../api-caller.service';


@Component({
  selector: 'boat-details',
  templateUrl: './boat-details.component.html',
})
export class BoatDetailsComponent {

  public boat: Boat = {name:""} as Boat;
  private id: string;

  constructor(private route: ActivatedRoute, private apiCaller: ApiCaller) {
    this.id = this.route.snapshot.paramMap.get("id");
    this.apiCaller.getBoat(this.id).subscribe(r => {
      /*if (r.status === 404)
        console.log("Not found : " + JSON.stringify(r)); // Change to redirect to home with message
      else*/
        this.boat = r;
    }, err => console.error(err));
  }

  onSaveChange(boat: Boat): void {
    this.boat = boat;
  }

  getModal(): void {
    document.getElementById('modifyModal').style.display = "block";
  }

}
