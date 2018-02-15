import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule} from "@angular/router";

import { RocktionarySharedModule} from "../../shared/shared.module";

import{
    perfilRoute,
    PerfilComponent
} from './';

const ENTITY_STATES = [
    ...perfilRoute
];

@NgModule({
  imports: [
    RocktionarySharedModule,
    RouterModule.forChild(ENTITY_STATES)
  ],
  declarations: [
      PerfilComponent
  ],
  entryComponents: [
      PerfilComponent
  ],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PerfilModule { }
