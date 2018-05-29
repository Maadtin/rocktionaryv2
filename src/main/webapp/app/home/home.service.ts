import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http'

import { Observable } from 'rxjs/Observable';
import {SpotifyService} from "../spotify.service";

@Injectable()
export class HomeService {

  private headers: any;
  private token = this.spotifyService.getToken();

  constructor (private http: HttpClient, private spotifyService: SpotifyService) {}

  getSearchResults (params: any): Observable<any> {
      return this.http
          .get(`https://api.spotify.com/v1/search/?q=${params.searchQuery}&type=${params.searchCriteria}`, {headers: { 'Authorization': this.token } })
  }

    getArtist (urlArtist: string): Promise<any> {
        return this.http
            .get(urlArtist, {headers: { 'Authorization': this.token } }).toPromise();
    }



}
