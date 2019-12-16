import { Component, OnInit } from '@angular/core';
import { ComicsService } from '../services/comics.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.css']
})
export class ComicsComponent implements OnInit {

  constructor(public comicSvc: ComicsService) { }

  allComics: Observable<any>;

  ngOnInit() {
    this.getComics();
  }

  getComics() {
    this.allComics = this.comicSvc.getAllComics();
  }

}
