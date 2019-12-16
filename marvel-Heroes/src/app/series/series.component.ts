import { Component, OnInit } from '@angular/core';
import { SeriesService } from '../services/series.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit {

  constructor(public serieSvc: SeriesService) { }

  allSeries: Observable<any>;

  ngOnInit() {
    this.getSeries();
  }

  public getSeries() {
    this.allSeries = this.serieSvc.getAllSeries();
  }

}
