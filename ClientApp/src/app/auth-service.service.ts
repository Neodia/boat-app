import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) { }

  login(username: string, password: string) {
    return this.http.post(this.baseUrl + 'api/login', { "username": username, "password": password });
  }

  logout() {
    localStorage.removeItem("jwt");
  }

  isLoggedIn(): boolean { return localStorage.getItem("jwt") !== null }

}
