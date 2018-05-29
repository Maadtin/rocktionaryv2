import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {UserExtService} from "../../user-ext";
import {SpotifyUser} from "../../../models/SpotifyUser";
import {PlayList} from "../../../models/PlayList";
import {ActivatedRoute} from "@angular/router";
import {UtilsService} from "../../../utils.service";
import {SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'jhi-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.scss']
})
export class PlaylistComponent implements OnInit {

  private spotifyUser: SpotifyUser;
  private playList: PlayList;

  constructor(private location: Location, private userExtService: UserExtService, private route: ActivatedRoute, private utils: UtilsService) { }

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

}
