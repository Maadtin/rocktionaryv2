import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Banda } from './banda.model';
import { BandaService } from './banda.service';
import {UtilsService} from '../../utils.service';
import {DomSanitizer} from '@angular/platform-browser';
import {VideoPlayerGlobals} from '../../video-player-globals';
import {Principal} from "../../shared";
import {UserExtService} from "../user-ext/user-ext.service";

@Component({
    selector: 'jhi-banda-detail',
    templateUrl: './banda-detail.component.html',
    styleUrls: ['banda-detail.scss']
})
export class BandaDetailComponent implements OnInit {

    banda: any;
    private subscription: Subscription;
    private eventSubscriber: Subscription;
    private showGeneral: boolean;
    private bandaBio: object;
    private topTracks: object;
    public showTruncatedText: boolean;
    public activePlayer: boolean;
    private activeButton: number;
    public showComentarios: boolean;
    public commentText: null;
    public bandaComments: string[];
    public loggedUser: string;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private bandaService: BandaService,
        private route: ActivatedRoute,
        private utils: UtilsService,
        private sanitizer: DomSanitizer,
        private videoPlayerGlobals: VideoPlayerGlobals,
        private principal: Principal,
        private userExtService: UserExtService
    ) {
    }

    ngOnInit() {
        this.activePlayer = false;
        this.showTruncatedText = true;
        this.showGeneral = true;
        this.showComentarios = false;

        this.principal.identity()
            .then(user => this.loggedUser = user.login);

        this.subscription = this.route.params.subscribe(params => {
            this.bandaService.getBanda(params['id'])
                .subscribe(banda => {
                    this.banda = banda;
                    this.bandaService.getBandaBio(this.banda.name)
                        .subscribe(info => this.bandaBio = info);

                    this.bandaService.getBandaComments (this.banda.name)
                        .subscribe((comments: string[]) => this.bandaComments = comments)
                });

            this.bandaService.getTopTracks(params['id'])
                .subscribe(topTracks => this.topTracks = topTracks)
        });
        //
        // this.addTrackToAPlaylist();


        //this.registerChangeInBandas();
    }

    load(id) {
        this.bandaService.find(id)
            .subscribe((bandaResponse: HttpResponse<Banda>) => {
                this.banda = bandaResponse.body;
            });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    previousState() {
        window.history.back();
    }



    toggleIcon (playerId, $e, trackName) {
        this.activeButton = playerId;
        $e.target.parentElement.querySelector('i.fa').classList.remove('fa-pause', 'fa-play');

        if ($e.target.parentElement.querySelector('i.fa').classList.contains('fa-pause')) {
            $e.target.parentElement.querySelector('i.fa').classList.add('fa-play')
        } else {
            $e.target.parentElement.querySelector('i.fa').classList.add('fa-pause')
        }

        this.bandaService.getVideoTrack(this.banda.name,trackName).subscribe(video => {
            // this.videoPlayerGlobals.videoTrackId = video.items[0].id.videoId;
            this.videoPlayerGlobals.videoInfo = {
                nombre: video.items[0].snippet.title,
                bandaNombre: this.banda.name,
                bandaId: this.banda.id
            };

            console.log(video);
            this.videoPlayerGlobals.videoUrl = this
                .sanitizer
                .bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${video.items[0].id.videoId}?rel=0&autoplay=1`);
            this.videoPlayerGlobals.showVideoPlayer = true;
            this.videoPlayerGlobals.showVideo = true;
        });
    }

    // closeYoutubeVideo (e) {
    //     this.videoPlayerGlobals.closeYoutubeVideo(e);
    // }
    // minimizeYoutubeVideo () {
    //     this.videoPlayerGlobals.minimizeYoutubeVideo()
    // }
    // sanitizeUrl (url) {
    //     return this.sanitizer.bypassSecurityTrustUrl(url);
    // }

    triggerClass  ($e) {
        Array.from($e.target.parentElement.children).forEach((tab: any) => tab.classList.remove('active'));
        $e.target.classList.add('active');
        switch ($e.target.dataset.tab) {
            case 'general': this.showComentarios = false; break;
            // case 'Seguidores': vm.showSeguidores = true;vm.showGeneral=false;vm.showComentarios=false;break;
            case 'comentarios': this.showComentarios = true; break;
        }
    };

    addComment () {
        this.bandaService.addComment({ comentario: this.commentText, bandaName: this.banda.name })
            .subscribe((newComment: string) => {
                this.bandaComments.push(newComment);
                this.commentText = null;
            })
    }

    removeComment(id) {
        this.bandaService.removeComment(id)
            .subscribe(() => this.bandaComments = this.bandaComments.filter((comment: any) => comment.id !== id))
    }

    addTrackToAPlaylist(){
        this.bandaService.addTrackToAPlaylist().subscribe(tracks => console.log(tracks));
    }

    // ngOnDestroy() {
    //     this.subscription.unsubscribe();
    //     this.eventManager.destroy(this.eventSubscriber);
    // }
    // registerChangeInBandas() {
    //     this.eventSubscriber = this.eventManager.subscribe(
    //         'bandaListModification',
    //         (response) => this.load(this.banda.id)
    //     );
    // }

}
