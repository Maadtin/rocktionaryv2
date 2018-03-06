import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Album } from './album.model';
import { AlbumService } from './album.service';
import {UtilsService} from '../../utils.service';

@Component({
    selector: 'jhi-album-detail',
    templateUrl: './album-detail.component.html',
    styleUrls: ['./album-detail.scss']
})
export class AlbumDetailComponent implements OnInit {

    public album: any;
    public albumTracks: any;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private albumService: AlbumService,
        private route: ActivatedRoute,
        private utilsService: UtilsService
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {

            this.albumService.getAlbum(params['id']).subscribe(album => {
                this.album = album;
            });

            this.albumService.getAlbumTracks(params['id']).subscribe(albumTrack => {
                this.albumTracks = albumTrack
            })

            // this.load(params['id']);
        });
        //this.registerChangeInAlbums();
    }


    sanitizeUrl (url) {
        return this.utilsService.sanitizeUrl(url);
    }

    parseMillis (millis) {
        return this.utilsService.parseMillis(millis);
    }

    load(id) {
        this.albumService.find(id)
            .subscribe((albumResponse: HttpResponse<Album>) => {
                this.album = albumResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    // ngOnDestroy() {
    //     this.subscription.unsubscribe();
    //     this.eventManager.destroy(this.eventSubscriber);
    // }

    registerChangeInAlbums() {
        this.eventSubscriber = this.eventManager.subscribe(
            'albumListModification',
            (response) => this.load(this.album.id)
        );
    }
}
