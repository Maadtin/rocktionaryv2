import {Injectable, OnInit} from '@angular/core';
import { WindowService } from '../windowref.service'
import {
    HttpClient,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http'

import { Observable } from 'rxjs/Observable';
import {SpotifyService} from "../spotify.service";

@Injectable()
export class HomeService implements OnInit {

  private headers: any;
  private token = this.spotifyService.getToken();

  constructor (private http: HttpClient, private spotifyService: SpotifyService) {}

  ngOnInit () {
      this.headers = { 'Authorization': this.token }
  }

  getSearchResults (params: any): Observable<any> {
      console.log('Service token ->', this.token);
      return this.http
          .get(`https://api.spotify.com/v1/search/?q=${params.searchQuery}&type=${params.searchCriteria}`, {headers:  this.headers })
  }

    getArtist (urlArtist: string): Observable<any> {

        return this.http
            .get(urlArtist, {headers: this.headers});
    }



}
