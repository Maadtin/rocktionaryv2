import {
    AfterViewInit, Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild,
    ViewChildren
} from '@angular/core';
import { Location } from '@angular/common';
import {UserExtService} from "../../user-ext";
import {SpotifyUser} from "../../../models/SpotifyUser";
import {PlayList} from "../../../models/PlayList";
import {ActivatedRoute} from "@angular/router";
import {UtilsService} from "../../../utils.service";
import {SafeResourceUrl} from "@angular/platform-browser";
import {MusicPlayerService} from "../../../music-player/music-player.service";
import {CancionService} from "../../cancion";

@Component({
  selector: 'jhi-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.scss']
})
export class PlaylistComponent implements OnInit {


  private spotifyUser: SpotifyUser;
  private playList: PlayList;

  constructor(
      private location: Location,
      private userExtService: UserExtService,
      private route: ActivatedRoute,
      private utils: UtilsService,
      public musicPlayerService: MusicPlayerService,
      public cancionService: CancionService,
      private rd: Renderer2
      ) { }

  ngOnInit() {
      this.route.params.subscribe(param => {
          this.userExtService
              .getSpotifyUser()
              .subscribe((spotifyUser: SpotifyUser) => {
                  this.spotifyUser = spotifyUser;
                  this.userExtService.getPlayList(this.spotifyUser.id, param.playListId)
                      .subscribe((playList: PlayList) => this.playList = playList);
              });
      });
  }

  goBack () {
      this.location.back();
  }

  sanitizeUrl (url: string): SafeResourceUrl {
      return this.utils.sanitizeUrl(url);
  }

  toggleIcon (track, artist, albumImage) {

      this.bootstrapVideo(track, artist, albumImage);
  }


    bootstrapVideo (group, song, albumImage) {
        this.cancionService.getYoutubeVideo(group, song)
            .subscribe(video => {
                this.musicPlayerService.player.loadVideoById(video.items[0].id.videoId);
                this.musicPlayerService.albumImage = albumImage
                this.musicPlayerService.songInfo = `Ahora escuchando ${song} de ${group}`
            })
    }

}
