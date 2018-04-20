import { Component, OnInit } from '@angular/core';
import {AccountService} from "../../shared/auth/account.service";
import {Principal} from "../../shared/auth/principal.service";
import {UserExt} from "../user-ext/user-ext.model";
import { UserExtService} from "../user-ext/user-ext.service";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import { JhiAlertService} from "ng-jhipster";
import {User} from "../../shared/user/user.model";


@Component({
  selector: 'perfil',
  templateUrl: './perfil.component.html',
    styleUrls: [
      'perfil.scss'
  ]
})
export class PerfilComponent implements OnInit {
   settingsAccount: any;
    userExt: UserExt;
    user : User;

  constructor(
      private account: AccountService,
      private principal: Principal,
      private userExtService: UserExtService,

) {

  }

  ngOnInit() {
      this.principal.identity().then((account) => {
          this.settingsAccount = this.copyAccount(account);
          this.load(this.settingsAccount.id);
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

}
