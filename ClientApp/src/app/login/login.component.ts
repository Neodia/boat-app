import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiCaller } from '../api-caller.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  private form: FormGroup;
  private messageWarning: boolean = false;

  constructor(private fb: FormBuilder, private apiCaller: ApiCaller, private router: Router) {
    this.form = this.fb.group({
      inputUsername: ['', Validators.required],
      inputPassword: ['', Validators.required]
    });
  }

  login(): void {
    const val = this.form.value;

    if (val.inputUsername && val.inputPassword) {
      this.apiCaller.authService.login(val.inputUsername, val.inputPassword)
        .subscribe(
          (r) => {
            localStorage.setItem('jwt', r['token']);
            this.router.navigateByUrl('home');
          }, err => this.handleError()
        );
    }
  }

  handleError() {
    this.messageWarning = true;

    setTimeout(() => {                    
      this.messageWarning = false;
    }, 3000);
  }
}
