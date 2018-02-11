import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Account, LoginModalService, Principal } from '../shared';

import { HomeService } from './home.service'

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.scss'
    ]

})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;

    private inputSearchText: string;
    private placeHolderText: string;
    private clickedButton: string;
    private searchCriteria: string;
    private timeOut: any;

    constructor(private principal: Principal,
                private loginModalService: LoginModalService,
                private eventManager: JhiEventManager,
                private homeService: HomeService) {
    }

    ngOnInit() {
        this.placeHolderText = 'albumes';
        this.clickedButton = 'albumes';
        this.searchCriteria = 'album';

        this.principal.identity().then((account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    // métodos de búsqueda
    handleOnChangePlaceHolderText(filter: string): void {
        this.placeHolderText = filter;
        this.clickedButton = filter;
        this.handleOnSearchCriteriaChange(this.placeHolderText);
        console.log(this.searchCriteria)
    }

    handleOnSearchCriteriaChange (searchCriteria: string) {
        switch (searchCriteria) {
            case 'albumes':
                this.searchCriteria = 'album';
                break;
            case 'canciones':
                this.searchCriteria = 'track';
                break;
            case 'bandas':
                this.searchCriteria = 'artist';
                break;
        }
    }

    handleOnInputSearch() {
        const params: any = {
            searchCriteria: this.searchCriteria,
            searchQuery: this.inputSearchText
        };
        clearTimeout(this.timeOut);
        this.timeOut = setTimeout(() => {
            this.homeService
                .getSearchResults(params)
                .subscribe(
                    this.handleOnSuccess,
                    this.handleOnError
                )
        }, 500);
    }

    // error handling
    handleOnSuccess (res) { console.log(res)}
    handleOnError (err) {
        switch (err.status) {
            case 401:break;
            case 404:break;
            case 400:break;
        }
    }

}



