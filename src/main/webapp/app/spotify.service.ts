import { Injectable } from '@angular/core';
import {LocalStorageService} from "ngx-webstorage";

@Injectable()
export class SpotifyService {


  constructor(
      private localStorage: LocalStorageService,


  ) { }

  getToken () {
      return localStorage.getItem('spotifyToken');
  }


}
