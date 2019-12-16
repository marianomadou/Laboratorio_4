import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-comic',
  templateUrl: './comic.component.html',
  styleUrls: ['./comic.component.css']
})
export class ComicComponent implements OnInit {

  @Input()comic: any;
  
  constructor() { }

  ngOnInit() {

    console.log(this.comic)
  }


}
