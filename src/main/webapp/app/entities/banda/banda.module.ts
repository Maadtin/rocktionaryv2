import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BarRatingModule } from 'ngx-bar-rating'

import { RocktionarySharedModule } from '../../shared';
import {
    BandaService,
    BandaPopupService,
    BandaComponent,
    BandaDetailComponent,
    BandaDialogComponent,
    BandaPopupComponent,
    BandaDeletePopupComponent,
    BandaDeleteDialogComponent,
    bandaRoute,
    bandaPopupRoute
} from './';
import {UtilsService} from '../../utils.service';
import {BarRatingComponent} from "../../bar-rating/bar-rating.component";

const ENTITY_STATES = [
    ...bandaRoute,
    ...bandaPopupRoute,
];

@NgModule({
    imports: [
        RocktionarySharedModule,
        RouterModule.forChild(ENTITY_STATES),
        BarRatingModule
    ],
    declarations: [
        BandaComponent,
        BandaDetailComponent,
        BandaDialogComponent,
        BandaDeleteDialogComponent,
        BandaPopupComponent,
        BandaDeletePopupComponent,
        BarRatingComponent
    ],
    entryComponents: [
        BandaComponent,
        BandaDialogComponent,
        BandaPopupComponent,
        BandaDeleteDialogComponent,
        BandaDeletePopupComponent,
    ],
    providers: [
        BandaService,
        BandaPopupService,
        UtilsService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RocktionaryBandaModule {}
