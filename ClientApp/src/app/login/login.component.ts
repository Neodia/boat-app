import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  private form: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private router: Router) {
    this.form = this.fb.group({
      inputUsername: ['', Validators.required],
      inputPassword: ['', Validators.required]
    });
  }

  login(): void {
    const val = this.form.value;

    if (val.inputUsername && val.inputPassword) {
      this.http.post(this.baseUrl + 'api/login', { "username": val.inputUsername, "password": val.inputPassword })
        .subscribe(
          (r) => {
            console.log(r);
            localStorage.setItem('jwt', r['token']);
            this.router.navigateByUrl('home');
          }, err => console.error(err)
        );
    }
  }

}
