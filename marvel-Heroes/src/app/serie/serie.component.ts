import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-serie',
  templateUrl: './serie.component.html',
  styleUrls: ['./serie.component.css']
})
export class SerieComponent implements OnInit {

  @Input()serie: any;
  
  constructor() { }

  ngOnInit() {

    console.log(this.serie)
  }
}
