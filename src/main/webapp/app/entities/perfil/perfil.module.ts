import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule} from "@angular/router";

import { RocktionarySharedModule} from "../../shared/shared.module";

import {
    perfilRoute,
    PerfilComponent
} from './';
import {NgbDropdownModule, NgbPopoverModule} from "@ng-bootstrap/ng-bootstrap";
import { PlaylistComponent } from './playlist/playlist.component';
import { TrackComponent } from './track/track.component';
import { AllplaylistComponent } from './allplaylist/allplaylist.component';

const ENTITY_STATES = [
    ...perfilRoute
];

@NgModule({
  imports: [
    RocktionarySharedModule,
    RouterModule.forChild(ENTITY_STATES),
    NgbDropdownModule,
    NgbPopoverModule
  ],
  declarations: [
      PerfilComponent,
      PlaylistComponent,
      TrackComponent,
      AllplaylistComponent
  ],
  entryComponents: [
      PerfilComponent
  ],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PerfilModule { }
