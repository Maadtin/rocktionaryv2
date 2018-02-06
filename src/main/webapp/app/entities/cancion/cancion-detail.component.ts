import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Cancion } from './cancion.model';
import { CancionService } from './cancion.service';

@Component({
    selector: 'jhi-cancion-detail',
    templateUrl: './cancion-detail.component.html'
})
export class CancionDetailComponent implements OnInit, OnDestroy {

    cancion: Cancion;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private cancionService: CancionService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCancions();
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

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCancions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'cancionListModification',
            (response) => this.load(this.cancion.id)
        );
    }
}
