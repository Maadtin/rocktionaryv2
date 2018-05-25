import { Injectable } from '@angular/core';

@Injectable()
export class SpotifyService {


  constructor() { }

  getToken (): String {
      return localStorage.getItem('spotifyToken');
  }


}
