import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { ApiCaller } from "./api-caller.service";

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(private apiCaller: ApiCaller, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (!this.apiCaller.authService.isLoggedIn())
      this.router.navigate(['']);
    return true;
  }
}
