import { Injectable } from '@angular/core';

@Injectable()
export class SpotifyService {

  getToken () {
      return localStorage.getItem('spotifyToken');
  }


}
