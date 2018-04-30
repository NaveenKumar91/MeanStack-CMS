import { Component, OnInit } from '@angular/core';
import { ContactlistService } from "./contactlist.service";
import { DialogModule } from 'primeng/primeng';
import { FormsModule, FormGroup, FormBuilder, Validators, FormControl, ReactiveFormsModule } from '@angular/forms'
@Component({
  selector: 'app-contactlist',
  templateUrl: './contactlist.component.html',
  styleUrls: ['./contactlist.component.css'],
  providers: [ContactlistService]
})
export class ContactlistComponent implements OnInit {
  contactId: any;

  ageId: any;
  autosearchage: any;
  tokenval: any
  filterBO: any;
  Idcmp: any;
  val:number;
  val1:number;
  balancerange:any
  searchresults: any = [];
  contactBO: any = [];
  contactbyId: any = [];
  display: boolean = false;
  contactform = new FormGroup({
    fname: new FormControl(),
    pfbalance: new FormControl(),
    phone: new FormControl(),
    age: new FormControl(),
  });
  constructor(private service: ContactlistService) { }

  ngOnInit() {
    this.getlist();

  }
  handleChange(e) {
    //e.value is the new value
    this.ageId = e.value
    console.log("abc", e.value)
    this.getlist();
  }
  balance(e)
  {
    this.balancerange = e.value;
    console.log("Bal", this.balancerange)
    this.getlist();
  }
  showDialog() {
    this.contactbyId = {}
    this.display = true;
    this.Idcmp = -1
    console.log("add", this.Idcmp)
  }

  onSearchChange(searchValue: string) {
    this.autosearchage = searchValue;
    this.getlist();

  }
  getlist() {
    let data: any = {}
    data.age = this.ageId;
    data.searchvalue = this.autosearchage;
    data.pfbal=this.balancerange;
    this.service.getContactList(data).subscribe(
      response => {
        this.contactBO = response;
        console.log("GET BLOG", this.contactBO);
      }

    )
  }

  delete(id) {
    this.service.deleteContact(id).subscribe(
      response => {
        alert("Info has been Deleted Successfully")
        this.getlist();
      }

    )
  }
  edit(id) {
    this.contactId = id;
    this.display = true;
    this.Idcmp = this.contactId;
    console.log("dfd", this.Idcmp)
    this.service.getContactbyId(id).subscribe(
      response => {
        this.contactbyId = response;
        //console.log(" contact", this.contactbyId.firstname);
      }

    )
  }
  submitForm(form) {
    let data: any = {};
    data.firstname = form.fname;
    data.pfbalance = form.pfbalance;
    data.phone = form.phone;
    data.age = form.age;
    if (this.Idcmp == -1) {
      this.service.addContact(data).subscribe(
        response => {
          console.log("create contact", response);
          alert("Info has been Created Successfully")
          this.display = false;
          this.getlist();
        }
      )
    }
    else {
      this.service.EditContact(data, this.contactId).subscribe(
        response => {
          console.log("create contact", response);
          alert("Info has been Edited Successfully")
          this.display = false;
          this.getlist();
        }

      )

    }



  }
}



