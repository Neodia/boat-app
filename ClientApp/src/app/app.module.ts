import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { BoatDetailsComponent } from './boat-details/boat-details.component';
import { ModalModifyComponent } from './modal-modify/modal-modify.component';
import { LoginComponent } from './login/login.component';
import { ReqInterceptor } from './req-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    BoatDetailsComponent,
    ModalModifyComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent, pathMatch: 'full' },
      { path: 'home', component: HomeComponent, pathMatch: 'full' },
      { path: 'boat-details/:id', component: BoatDetailsComponent, pathMatch: 'full' }
    ])
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: ReqInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
