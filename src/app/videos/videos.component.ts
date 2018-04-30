import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormBuilder, Validators, FormControl, ReactiveFormsModule } from '@angular/forms'
import { Router } from "@angular/router";
import { VideosService } from "./videos.service";

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css'],
  providers: [VideosService]
})
export class VideosComponent implements OnInit {
  videolist: any;
  list: any = {}

  constructor(private router: Router, private service: VideosService) {
    this.videolist = []
  }

  ngOnInit() {
    this.ongetvideoList()
  }
  ongetvideoList() {
    this.service.getvideoList()
      .subscribe(
      response => {
        this.list = response;
        this.videolist = this.list;
        console.log("list",this.list)
      }
      );
  }
}
