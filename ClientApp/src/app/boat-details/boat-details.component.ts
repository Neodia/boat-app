import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Boat } from '../boat'
import { ApiCaller } from '../api-caller.service';


@Component({
  selector: 'boat-details',
  templateUrl: './boat-details.component.html',
})
export class BoatDetailsComponent {

  public boat: Boat;
  private id: string;
  private messageModifySuccess = false;

  constructor(private route: ActivatedRoute, private apiCaller: ApiCaller, router: Router) {
    this.id = this.route.snapshot.paramMap.get("id");
    this.apiCaller.getBoat(this.id).subscribe(r => {
      this.boat = r;
    }, err => router.navigateByUrl('home'));
  }

  onSaveChange(boat: Boat): void {
    this.boat = boat;
    this.handleModifySuccess();
  }

  getModal(): void {
    document.getElementById('modifyModal').style.display = "block";
  }

  handleModifySuccess() {
    this.messageModifySuccess = true;

    setTimeout(() => {
      this.messageModifySuccess = false;
    }, 3000);
  }

}
