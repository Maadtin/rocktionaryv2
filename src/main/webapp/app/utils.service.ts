import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class UtilsService {

  constructor(private sanitizer: DomSanitizer) { }

  sanitizeUrl (url) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  parseMillis = function(millis: number): string {
        let minutes = Math.floor(millis / 60000);
        let seconds = ((millis % 60000) / 1000).toFixed(0);
        return `${minutes}:${parseInt(seconds) < 10 ? '0' : ''}${seconds}`;
    }


}
