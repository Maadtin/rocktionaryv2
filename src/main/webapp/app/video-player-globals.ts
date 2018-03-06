import {Injectable, OnInit} from '@angular/core';
import {SafeResourceUrl} from '@angular/platform-browser';


@Injectable()
export class VideoPlayerGlobals implements OnInit {

    public showVideoPlayer: boolean;
    public showVideo: boolean;
    public videoInfo: object;
    public videoUrl: SafeResourceUrl;

    ngOnInit () {
        this.showVideoPlayer = true;
        this.showVideo = false;
    }

    closeYoutubeVideo (e) {
        e.target.parentElement.parentElement.parentElement.querySelector('iframe').src = '';
        this.showVideoPlayer = false;
    }
    minimizeYoutubeVideo () {
        this.showVideo = !this.showVideo;
    }
}
