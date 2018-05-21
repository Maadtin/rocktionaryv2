import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import * as annyang from 'annyang';
import { Account, LoginModalService, Principal } from '../shared';

import { HomeService } from './home.service'
import {UtilsService} from '../utils.service';
import {SafeResourceUrl} from '@angular/platform-browser';
import {WindowService} from "../windowref.service";

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
    private isLoading: boolean;
    private results: any;
    private isError: boolean;
    private resultsText: string;
    private errorText: string;
    private showResultsContainer: boolean;
    public isListening: boolean;

    constructor (private principal: Principal,
                private loginModalService: LoginModalService,
                private eventManager: JhiEventManager,
                private homeService: HomeService,
                private utilsService: UtilsService,
                private window: WindowService,
                private detector: ChangeDetectorRef
    ) {
    }

    ngOnInit() {
        this.isListening = false;
        this.placeHolderText = 'albumes';
        this.clickedButton = 'albumes';
        this.inputSearchText = '';
        this.searchCriteria = 'album';
        this.isLoading = true;
        this.isError = false;
        this.errorText = '';
        this.showResultsContainer = false;

        this.principal.identity().then((account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
    }

    toggleRecognition () {
        if (annyang.isListening()) {
            annyang.abort();
            this.isListening = false;
            return
        }


        const commands = {
            'Busca *criteria': criteria => {
                this.inputSearchText = criteria;
                this.handleOnInputSearch();
                this.detector.detectChanges();
            }
        };
        annyang.addCommands(commands);
        annyang.start();
        annyang.setLanguage('es-ES');
        annyang.debug(true);
        this.isListening = true;
    }

    sanitizeUrl (url: string): SafeResourceUrl {
        return this.utilsService.sanitizeUrl(url);
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
        this.showResultsContainer = !!this.inputSearchText;

        if (this.inputSearchText !== '') {

            this.isLoading = true;

            const params: any = {
                searchCriteria: this.searchCriteria,
                searchQuery: this.inputSearchText
            };
            clearTimeout(this.timeOut);
            this.timeOut = setTimeout(() => {
                this.homeService
                    .getSearchResults(params)
                    .subscribe(
                        data => this.handleOnSuccess(data),
                        error => this.handleOnError(error)
                    )
            }, 500);
        }

    }

    // error handling
    handleOnSuccess (res) {
        console.log(res);
        this.isLoading = false;
        if (res[this.searchCriteria+'s'].items.length === 0) {
            this.isError = true;
            this.errorText = 'No hubo resultados con la búsqueda ' + this.inputSearchText;
        } else {
            this.isError = false;
            this.resultsText = 'Resultados de tú búsqueda con ' + this.inputSearchText
            this.results = res[this.searchCriteria+'s'].items;
        }
    }
    handleOnError (err) {

        this.isLoading = false;
        this.isError = true;
        switch(err.status) {
            case 401: this.errorText = 'Debes logearte con tu cuenta de para poder usar el buscador'; break;
            case 404: this.errorText = err.statusText; break;
            case 500: this.errorText = err.statusText;  break;
        }

    }

}





