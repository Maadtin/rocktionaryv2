import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { YT } from 'ngx-youtube-player/src/services/youtube-player.service';

import { Cancion } from './cancion.model';
import { CancionService } from './cancion.service';
import {BandaService} from '../banda';
import {YoutubeModel} from '../../models/Youtube';
import {UtilsService} from '../../utils.service';
import {SafeResourceUrl} from '@angular/platform-browser';

@Component({
    selector: 'jhi-cancion-detail',
    templateUrl: './cancion-detail.component.html',
    styleUrls: ['./cancion-detail.scss']
})
export class CancionDetailComponent implements OnInit {

    public cancion;
    public banda;
    private subscription: Subscription;
    private eventSubscriber: Subscription;
    public videoUrl: SafeResourceUrl;

    public player: YT.Player;
    public id = null;
    public max: number;
    public rangeVal: number;
    public isPlaying: boolean;
    private timer: string;

    constructor(
        private eventManager: JhiEventManager,
        private cancionService: CancionService,
        private bandaService: BandaService,
        private route: ActivatedRoute,
        private utilsService: UtilsService
    ) {
    }

    ngOnInit() {

        this.isPlaying = true;
        this.rangeVal = 0;

        this.subscription = this.route.params.subscribe((params) => {
            //this.load(params['id']);
            this.cancionService.getCancion(params['id']).subscribe(cancion => {
                this.cancion = cancion;
                this.bandaService.getBanda(this.cancion.album.artists[0].id).subscribe(banda => this.banda = banda);
                this.cancionService.getYoutubeVideo(this.cancion.album.artists[0].name, this.cancion.name).subscribe(video => {
                    this.id = video.items[0].id.videoId;
                    //this.videoUrl = this.utilsService.sanitizeUrl(`https://www.youtube.com/embed/${video.items[0].id.videoId}?autoplay=1&rel=0`);
                })
            });


        });
        // this.registerChangeInCancions();
    }

    dragg () {
        this.player.seekTo(this.rangeVal, true);
    }

    savePlayer (player) {
        console.log('Player ', player);
        this.player = player;

        setTimeout(() => {
            this.player.loadVideoById(this.id);
            this.player.playVideo();
            this.initInterval();
            this.max = this.player.getDuration();

        }, 500);


    }

    initInterval () {
        setInterval(() => {
            this.timer = this.player.getCurrentTime().toFixed(2);
            this.rangeVal = parseInt(this.timer);
            console.log('Current time ', this.player.getCurrentTime());
            console.log('Get Duration ', this.player.getDuration())
            console.log('Available PlayBackRate', this.player.getAvailablePlaybackRates())
            console.log('Get PlayBackRate ', this.player.getPlaybackRate())
        }, 100);
    }

    loadVideoClick (id) {
        this.player.loadVideoById(id)
    }

    toggleVideo () {
        if (this.player.getPlayerState() === 1) {
            this.isPlaying = false;
            this.player.pauseVideo();
        } else {
            this.isPlaying = true;
            this.player.playVideo();
        }
    }

    onStateChange ($e) {
        console.log($e)
    }

    load(id) {
        this.cancionService.find(id)
            .subscribe((cancionResponse: HttpResponse<Cancion>) => {
                this.cancion = cancionResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    // ngOnDestroy() {
    //     this.subscription.unsubscribe();
    //     this.eventManager.destroy(this.eventSubscriber);
    // }

    // registerChangeInCancions() {
    //     this.eventSubscriber = this.eventManager.subscribe(
    //         'cancionListModification',
    //         (response) => this.load(this.cancion.id)
    //     );
    // }
}
