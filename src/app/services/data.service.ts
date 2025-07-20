import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Item } from '../models/item.model';

@Injectable({ providedIn: 'root' })
export class DataService {
  private url = 'assets/angular_Response.json'; // הנתיב ל-json

  constructor(private httpClient: HttpClient) { }

  getItems(): Observable<Item[]> {
    return this.httpClient.get<{
      results: Item[];
      }>(this.url).pipe(map((res) =>
        res.results
      ));
  }


getItemById(imdbID: string): Observable<Item> {
  return this.getItems().pipe(
    map(results => results.find((item: any) => item.imdbID === imdbID))
  );
}

  updateItem(item: Item): Observable<any> {
    return this.httpClient.post(`${this.url}/${item.imdbID}`, item);
  }
}