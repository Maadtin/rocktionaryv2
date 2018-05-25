import { Component, OnInit } from '@angular/core';
import {AccountService} from "../../shared/auth/account.service";
import {Principal} from "../../shared/auth/principal.service";
import {UserExt} from "../user-ext/user-ext.model";
import { UserExtService} from "../user-ext/user-ext.service";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {JhiAlertService, JhiEventManager} from "ng-jhipster";
import {User} from "../../shared/user/user.model";
import {Subscription} from "rxjs/Subscription";
import {PlayList} from "../../models/PlayList";
import { UserPlaylist } from "../../models/UserPlaylist";
import {VideoPlayerGlobals} from '../../video-player-globals';
@Component({
  selector: 'user',
  templateUrl: './perfil.component.html',
    styleUrls: [
      'perfil.scss'
  ]
})
export class PerfilComponent implements OnInit {
    public showVideoPlayer: boolean;
    public showVideo: boolean;
    settingsAccount: any;
    userExt: UserExt;
    user : User;
    eventSubscriber: Subscription;
    private userPlaylist: any;
    private topTracks: object;

    public showTruncatedText: boolean;
    public activePlayer: boolean;
    private showGeneral: boolean;

    constructor(
      private account: AccountService,
      private principal: Principal,
      private userExtService: UserExtService,
      private eventManager: JhiEventManager,
      private videoPlayerGlobals: VideoPlayerGlobals


  ) {

  }

  ngOnInit() {
      this.showVideoPlayer = true;
      this.showVideo = false;

      this.activePlayer = false;
      this.showTruncatedText = true;
      this.showGeneral = true;

      this.principal.identity().then((account) => {
          this.settingsAccount = this.copyAccount(account);
          this.load(this.settingsAccount.id);
          this.eventSubscriber = this.eventManager.
          subscribe('userExtListModification',
              (response) => this.load(this.settingsAccount.id));
          this.getUserTracksByPlayList();
          this.getUserPlaylist();
      });
  }


    copyAccount(account) {
        return {
            activated: account.activated,
            email: account.email,
            firstName: account.firstName,
            langKey: account.langKey,
            lastName: account.lastName,
            login: account.login,
            imageUrl: account.imageUrl,
            id: account.id
        };
    }

    load(id) {
        this.userExtService.findByUser(id)
            .subscribe((userExtResponse: HttpResponse<UserExt>) => {
                this.userExt   = userExtResponse.body;
            });
    }

    getUserPlaylist(){
       this.userExtService.getUserPlayList().subscribe((playlist: PlayList) =>  {
           // console.log(playlist);
       })
    }


    getUserTracksByPlayList(){
        this.userExtService.getUserTracksByPlayList().subscribe((list:any) => {
            this.userPlaylist = list.items;
            console.log(this.userPlaylist);
        })
    }


}
