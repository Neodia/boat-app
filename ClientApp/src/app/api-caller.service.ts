import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { AuthService } from "./auth-service.service";
import { Boat } from "./boat";


@Injectable({
  providedIn: 'root'
})
export class ApiCaller {

  constructor(
    public authService: AuthService,
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) { }

  getBoats() {
    return this.http.get<Boat[]>(this.baseUrl + 'api/boat');
  }

  getBoat(id: string) {
    return this.http.get<Boat>(this.baseUrl + 'api/boat/' + id);
  }

  addBoat(name: string, desc: string) {
    return this.http.post(this.baseUrl + "api/boat", { name: name, desc: desc } as Boat)
  }

  updateBoat(newBoat: Boat) {
    return this.http.put(this.baseUrl + 'api/boat/' + newBoat.id, newBoat);
  }

  deleteBoat(id: string) {
    return this.http.delete(this.baseUrl + "api/boat/" + id);
  }

}
