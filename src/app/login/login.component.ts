import { Component, OnInit } from '@angular/core';
import { DialogModule } from 'primeng/primeng';
import { FormsModule, FormGroup, FormBuilder, Validators, FormControl, ReactiveFormsModule } from '@angular/forms'
import { LoginService } from "./login.service";
import { Router, ActivatedRoute } from '@angular/router';

import { CookieService } from 'angular2-cookie/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  
  loginform = new FormGroup({
    signinemail: new FormControl('',Validators.required),
    signinpassword: new FormControl('',Validators.required)
  });
  signupform = new FormGroup({
    fname: new FormControl('',Validators.required),
    lname: new FormControl('',Validators.required),
    email: new FormControl('',Validators.required),
    pwd: new FormControl('',Validators.required)
  });
  constructor(private service: LoginService,private cookies: CookieService,private router: Router ) { }

  ngOnInit() {
     
  }
  
 
 
   
 
  submitsignupform(form) {
    let data: any = {};
    data.firstname = form.fname;
    data.lastname = form.lname;
    data.email = form.email;
    data.password = form.pwd;
   console.log("details", data)
    this.service.adduser(data).subscribe(
      response => {
        //this.userinfo = response;
        //console.log("userinfo",this.userinfo)
        alert("User has been registered successfully");
        this.signupform.reset();
      }
    )
  }
  submitForm(form) {
    let data: any = {};
    data.email = form.signinemail;
    data.password = form.signinpassword;
    this.service.loginuser(data).subscribe(
      response => {
        console.log("Storage",response)
        //this.cookies.put('token',response.token);
        //this.cookies.put('userId',response.userId);
        //this.cookies.put('username',response.username);
        localStorage.setItem('token',response.token)
        localStorage.setItem('userId',response.userId)
        localStorage.setItem('username',response.username)
        this.loginform.reset();
        this.router.navigate(['/contact'])
      }
    )
  }

}
