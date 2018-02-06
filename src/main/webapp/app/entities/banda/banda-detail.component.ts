import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Banda } from './banda.model';
import { BandaService } from './banda.service';

@Component({
    selector: 'jhi-banda-detail',
    templateUrl: './banda-detail.component.html'
})
export class BandaDetailComponent implements OnInit, OnDestroy {

    banda: Banda;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private bandaService: BandaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBandas();
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

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBandas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'bandaListModification',
            (response) => this.load(this.banda.id)
        );
    }
}
