import { Component, OnInit } from '@angular/core';
import {AccountService} from "../../shared/auth/account.service";
import {Principal} from "../../shared/auth/principal.service";

@Component({
  selector: 'perfil',
  templateUrl: './perfil.component.html',
    styleUrls: [
      'perfil.scss'
  ]
})
export class PerfilComponent implements OnInit {
   settingsAccount: any;

  constructor(
      private account: AccountService,
      private principal: Principal
  ) {

  }

  ngOnInit() {
      this.principal.identity().then((account) => {
          this.settingsAccount = this.copyAccount(account);
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
            imageUrl: account.imageUrl
        };
    }

}
