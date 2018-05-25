import { Injectable } from '@angular/core';
import { WindowService } from '../windowref.service'
import {
    HttpClient,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http'

import { Observable } from 'rxjs/Observable';

@Injectable()
export class HomeService {

  constructor (private http: HttpClient,
               private windowRef: WindowService) {

  }

  getSearchResults (params: any): Observable<any> {
      const headers = {
          'Authorization':
              this.windowRef.getNativeWindow().spotifyToken === undefined
                  ? 'Bearer eqweqw'
                  : this.windowRef.getNativeWindow().spotifyToken
      };

      return this.http
          .get(`https://api.spotify.com/v1/search/?q=${params.searchQuery}&type=${params.searchCriteria}`, {headers: headers})
  }

    getArtist (urlArtist: string): Promise<any> {
        const headers = {
            'Authorization':
                this.windowRef.getNativeWindow().spotifyToken === undefined
                    ? 'Bearer eqweqw'
                    : this.windowRef.getNativeWindow().spotifyToken
        };

        return this.http
            .get(urlArtist, {headers: headers}).toPromise();
    }



}
