import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Banda } from './banda.model';
import { BandaService } from './banda.service';

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

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private bandaService: BandaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.showTruncatedText = true;
        this.showGeneral = true;
        this.subscription = this.route.params.subscribe(params => {
            this.bandaService.getBanda(params['id'])
                .subscribe(banda => {
                    this.banda = banda;
                    this.bandaService.getBandaBio(this.banda.name)
                        .subscribe(info => this.bandaBio = info)
                });

            this.bandaService.getTopTracks(params['id'])
                .subscribe(topTracks => this.topTracks = topTracks)

        });

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



    toggleIcon (playerId) {

        console.log(playerId)


        // angular.element($e.target).toggleClass('fa-pause');
        // angular.element('.track-icon-play').not($e.target).removeClass('fa-pause').addClass('fa-play')

        // BandaService.getBandaVideoTrack($e.target.dataset.trackName).get()
        //     .$promise
        //     .then(res => {
        //         const { videoId } = res.items[0].id;
        //         angular.element('#videoPlayer').html('').html(
        //             `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}?rel=0&autoplay=1" frameborder="0"    allowfullscreen></iframe>`
        //         ).css('display', 'block');
        //     })
    }


    triggerClass  ($e) {
        // angular.element($e.target).siblings().removeClass('active')
        // angular.element($e.target).addClass('active');
        //
        // switch ($e.target.textContent) {
        //     case 'General': vm.showGeneral = true;vm.showComentarios=false;vm.showSeguidores=false;break;
        //     case 'Seguidores': vm.showSeguidores = true;vm.showGeneral=false;vm.showComentarios=false;break;
        //     case 'Comentarios': vm.showComentarios = true;vm.showGeneral=false;vm.showSeguidores=false;break;
        // }
    };

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
