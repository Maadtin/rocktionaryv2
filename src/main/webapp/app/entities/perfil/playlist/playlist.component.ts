import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {UserExtService} from "../../user-ext";
import {SpotifyUser} from "../../../models/SpotifyUser";
import {PlayList} from "../../../models/PlayList";
import {ActivatedRoute} from "@angular/router";
import {UtilsService} from "../../../utils.service";
import {SafeResourceUrl} from "@angular/platform-browser";
import {MusicPlayerService} from "../../../music-player/music-player.service";

@Component({
  selector: 'jhi-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.scss']
})
export class PlaylistComponent implements OnInit {

  private spotifyUser: SpotifyUser;
  private playList: PlayList;
  private selectedTrack;
  private playButtonClass: string = 'fa fa-pause';

  constructor(
      private location: Location,
      private userExtService: UserExtService,
      private route: ActivatedRoute,
      private utils: UtilsService,
      public musicPlayerService: MusicPlayerService
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

      console.log(this);
  }

  goBack () {
      this.location.back();
  }

  sanitizeUrl (url: string): SafeResourceUrl {
      return this.utils.sanitizeUrl(url);
  }

    toggleIcon (playerId, $e, trackName) {
        this.musicPlayerService.toggleVideo();
    }

}
