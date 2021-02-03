import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  public boats: Boat[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    console.log(baseUrl);
    http.get<Boat[]>(baseUrl + 'api/boat').subscribe(r => this.boats = r, err => console.error(err));
  }

}

interface Boat {
  id: number;
  name: string;
  desc: string;
}
