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
import {ActivatedRoute} from "@angular/router";
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
    userExt: UserExt;
    user : User;
    subscription: Subscription;
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
      private videoPlayerGlobals: VideoPlayerGlobals,
      private route: ActivatedRoute

  ) {

  }

  ngOnInit() {
      this.showVideoPlayer = true;
      this.showVideo = false;

      this.activePlayer = false;
      this.showTruncatedText = true;
      this.showGeneral = true;

      this.principal.identity().then((account) => {
          console.log('Indentity -> ', account);
          // this.load(account.id);
          // this.eventSubscriber = this.eventManager.
          // subscribe('userExtListModification', () => this.load(account.id));
          // this.getUserTracksByPlayList();
          // this.getUserPlaylist();
          //console.log('UserExt ->', this.userExt);
          this.subscription = this.route.params.subscribe(params => {
             console.log('Params ->', params);
          });
          this.load(account.login);
      });
  }


    load(id) {
        this.userExtService.getUserExt(id)
            .subscribe((userExtResponse: HttpResponse<UserExt>) => {
                console.log('findByUserResponse ->', userExtResponse);
                this.userExt  = userExtResponse.body;
                console.log(this.userExt)
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
