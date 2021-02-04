import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Boat } from '../boat'


@Component({
  selector: 'boat-details',
  templateUrl: './boat-details.component.html',
})
export class BoatDetailsComponent {

  public boat: Boat = {name:""} as Boat;
  private id: string;

  constructor(private route: ActivatedRoute, http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    console.log(baseUrl);
    this.id = this.route.snapshot.paramMap.get("id");
    http.get<Resp>(baseUrl + 'api/boat/' + this.id).subscribe(r => {
      if (r.status === 404)
        console.log("Not found : " + JSON.stringify(r)); // Change to redirect to home with message
      else
        this.boat = r.obj;
    }, err => console.error(err));
  }

  onSaveChange(boat: Boat): void {
    this.boat = boat;
  }

  getModal(): void {
    document.getElementById('modifyModal').style.display = "block";
  }

}

interface Resp {
  status: number,
  message: string,
  obj: Boat
}
