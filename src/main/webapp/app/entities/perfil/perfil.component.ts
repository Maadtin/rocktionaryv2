import { Component, OnInit } from '@angular/core';
import {AccountService} from "../../shared/auth/account.service";
import {Principal} from "../../shared/auth/principal.service";
import {UserExt} from "../user-ext/user-ext.model";
import { UserExtService} from "../user-ext/user-ext.service";
import {User} from "../../shared/user/user.model";
import {Subscription} from "rxjs/Subscription";
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

    public showTruncatedText: boolean;
    public activePlayer: boolean;
    private showGeneral: boolean;
    private routeUserName: any;

    constructor(
      private account: AccountService,
      private principal: Principal,
      private userExtService: UserExtService,
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

      this.route.params.subscribe(param => {
          this.routeUserName = param.userName;
          this.userExtService.getUserExt(this.routeUserName).subscribe(user => {
              this.userExt = user;
          });
      })
      // blabla
  }

}
