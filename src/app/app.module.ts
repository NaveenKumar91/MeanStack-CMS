import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './navbar/navbar.Component';
import {SliderModule} from 'primeng/primeng';
import { AppComponent } from './app.component';
import { FormsModule, FormGroup, FormBuilder, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ContactlistComponent } from './contactlist/contactlist.component';
import { DialogModule } from "primeng/primeng";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { CookieService } from 'angular2-cookie/core';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ContactlistComponent,
    LoginComponent,

  ],
  imports: [
    BrowserModule, 
    AppRoutingModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    SliderModule,
    BrowserAnimationsModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
