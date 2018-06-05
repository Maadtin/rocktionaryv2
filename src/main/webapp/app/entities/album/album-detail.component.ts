import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Album } from './album.model';
import { AlbumService } from './album.service';
import {UtilsService} from '../../utils.service';
import {MusicPlayerService} from "../../music-player/music-player.service";
import {UserExtService} from "../user-ext";
import {Track, TrackItem} from "../../interfaces/SpotifyInterfaces";
import {YoutubeModel} from "../../models/Youtube";
import {Principal, User} from "../../shared";

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

    public commentText: string;
    public showComentarios: boolean = false;

    public albumComments: string[];
    public loggedUser: string;

    constructor(
        private eventManager: JhiEventManager,
        private albumService: AlbumService,
        private route: ActivatedRoute,
        private utilsService: UtilsService,
        private musicPlayerService: MusicPlayerService,
        private userExtService: UserExtService,
        private principal: Principal
    ) {
    }

    ngOnInit() {

        this.albumComments = [];

        this.principal.identity()
            .then((user: User) => this.loggedUser = user.login);

        this.subscription = this.route.params.subscribe((params) => {

            this.albumService.getAlbum(params['id']).subscribe(album => {
                this.album = album;
            });

            this.albumService.getAlbumTracks(params['id']).subscribe(albumTrack => {
                this.albumTracks = albumTrack;

                this.albumService.getAlbumComments (this.album.name)
                    .subscribe((comments: string[]) => {
                        console.log(comments);
                        this.albumComments = comments
                    })
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

    addComment () {
        this.albumService.addComment({ comentario: this.commentText, albumName: this.album.name })
            .subscribe((newComment: string) => {
                this.albumComments.push(newComment);
                this.commentText = null;
            })
    }

    removeComment(e, id) {
        e.target.parentElement.querySelector('.loader-container').style.display = 'block';
        this.albumService.removeComment(id)
            .subscribe(() => {
                this.albumComments = this.albumComments.filter((comment: any) => comment.id !== id);
                e.target.parentElement.querySelector('.loader-container').style.display = 'none';
            })
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


    triggerClass  ($e) {
        Array.from($e.target.parentElement.children).forEach((tab: any) => tab.classList.remove('active'));
        $e.target.classList.add('active');
        switch ($e.target.dataset.tab) {
            case 'general': this.showComentarios = false; break;
            // case 'Seguidores': vm.showSeguidores = true;vm.showGeneral=false;vm.showComentarios=false;break;
            case 'comentarios': this.showComentarios = true; break;
        }
    };

    playTrack(track) {
        this.userExtService.getVideoTrack(track.artists[0].name, track.name)
            .subscribe((video: YoutubeModel) => {
                this.musicPlayerService.player.loadVideoById(video.items[0].id.videoId);
                this.musicPlayerService.group = track.artists[0].name;
                this.musicPlayerService.artistId = track.artists[0].id;
                this.musicPlayerService.song = track.name;
            })
    }
}
