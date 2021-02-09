import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCaller } from '../api-caller.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;

  constructor(private apiCaller: ApiCaller, private router: Router) { }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  logout() {
    this.apiCaller.authService.logout();
    this.router.navigateByUrl('/');
  }
}
