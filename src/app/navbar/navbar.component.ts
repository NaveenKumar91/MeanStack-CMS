import { Component, OnInit } from '@angular/core';
import { LoginService } from "../login/login.service";
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'angular2-cookie/core';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [LoginService]

})
export class NavbarComponent implements OnInit {
  username: any;
  constructor(private service: LoginService,private cookies: CookieService, private router: Router) {
   }

  ngOnInit() {
        this.username = localStorage.getItem("username")

  }
  Signout() {
   localStorage.removeItem;
    this.router.navigate(['/'])
  }
}
