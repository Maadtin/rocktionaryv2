import { Route } from '@angular/router';

import { HomeComponent } from './';
import {ParallaxComponent} from "../parallax/parallax.component";

export const HOME_ROUTE: Route = {
    path: '',
    component: ParallaxComponent,
    data: {
        authorities: [],
        pageTitle: 'home.title'
    }
};
