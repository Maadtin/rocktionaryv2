import './vendor.ts';

import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Ng2Webstorage, LocalStorageService, SessionStorageService  } from 'ngx-webstorage';
import { JhiEventManager } from 'ng-jhipster';

import { AuthInterceptor } from './blocks/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { RocktionarySharedModule, UserRouteAccessService } from './shared';
import { RocktionaryAppRoutingModule} from './app-routing.module';
import { RocktionaryHomeModule } from './home/home.module';
import { RocktionaryAdminModule } from './admin/admin.module';
import { RocktionaryAccountModule } from './account/account.module';
import { RocktionaryEntityModule } from './entities/entity.module';
import { PaginationConfig } from './blocks/config/uib-pagination.config';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import {
    JhiMainComponent,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ActiveMenuDirective,
    ErrorComponent
} from './layouts';
import { VideoPlayerComponent } from './video-player/video-player.component';
import {VideoPlayerGlobals} from './video-player-globals';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {YoutubePlayerModule} from 'ngx-youtube-player';
import {NavbarService} from './layouts/navbar/navbar.service';
import { ParallaxComponent } from './parallax/parallax.component';
import { BarRatingComponent } from './bar-rating/bar-rating.component';
import { ComentariosComponent } from './entitites/comentarios/comentarios.component';
// import { YoutubePlayerWrapperComponent } from './youtube-player-wrapper/youtube-player-wrapper.component';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RocktionaryAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        RocktionarySharedModule,
        RocktionaryHomeModule,
        RocktionaryAdminModule,
        RocktionaryAccountModule,
        RocktionaryEntityModule,
        YoutubePlayerModule
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
        FooterComponent,
        VideoPlayerComponent,
        NavbarComponent,
        ParallaxComponent,
        ComentariosComponent
        // YoutubePlayerWrapperComponent
    ],
    providers: [
        VideoPlayerGlobals,
        ProfileService,
        PaginationConfig,
        UserRouteAccessService,
        NavbarService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
            deps: [
                LocalStorageService,
                SessionStorageService
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true,
            deps: [
                Injector
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true,
            deps: [
                JhiEventManager
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true,
            deps: [
                Injector
            ]
        }
    ],
    bootstrap: [ JhiMainComponent ]
})
export class RocktionaryAppModule {}
