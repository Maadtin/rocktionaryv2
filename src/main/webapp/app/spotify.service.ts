import { Injectable } from '@angular/core';
import {LocalStorageService} from "ngx-webstorage";

@Injectable()
export class SpotifyService {

  getToken () {
      return localStorage.getItem('spotifyToken');
  }


}
