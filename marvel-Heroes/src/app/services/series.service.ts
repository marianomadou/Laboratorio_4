import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {
  PUBLIC_KEY = '69b096e1c26ac532386f717bfcf0cf7f';
  HASH = 'fa7bdbdd54c0fdf200b4a7f32e071267';
  URL_API = `https://gateway.marvel.com/v1/public/series?ts=1&apikey=${this.PUBLIC_KEY}&hash=${this.HASH}`;

  //https:gateway.marvel.com/v1/public/characters?ts=1&apikey=69b096e1c26ac532386f717bfcf0cf7f&hash=fa7bdbdd54c0fdf200b4a7f32e071267

  constructor(public http: HttpClient) {

  }

  public getAllSeries(): Observable<any> {
    var resultado = this.http.get<any>(this.URL_API)
      .pipe(
        map((data: any) =>
          data.data.results.filter(result =>
            result.thumbnail.path != "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"
          )
        ));
    console.log('results?', resultado)
    return resultado;
  }
}
