import Beer from '../models/beer.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Response} from '@angular/http';
import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Injectable()
export class BeerService {
    api_url = 'http://localhost:3000';
    beerUrl = `${this.api_url}/api/beers`;

    constructor(
        private http: HttpClient
        ) { }

    getBeers(): Observable<Beer[]> {
        return this.http.get(this.beerUrl)
        .map(res  => {
          // Maps the response object sent from the server
          console.log(res['data']);
          return res['data'];
        });
      }

}
