import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { RocktionaryBandaModule } from './banda/banda.module';
import { RocktionaryDiscograficaModule } from './discografica/discografica.module';
import { RocktionaryComponenteModule } from './componente/componente.module';
import { RocktionaryPuntuacionBandaModule } from './puntuacion-banda/puntuacion-banda.module';
import { RocktionaryPuntuacionAlbumModule } from './puntuacion-album/puntuacion-album.module';
import { RocktionaryPuntuacionCancionModule } from './puntuacion-cancion/puntuacion-cancion.module';
import { RocktionaryAlbumModule } from './album/album.module';
import { RocktionaryCancionModule } from './cancion/cancion.module';
import { RocktionaryUserExtModule } from './user-ext/user-ext.module';
import { RocktionaryComentarCancionModule } from './comentar-cancion/comentar-cancion.module';
import { RocktionaryComentarAlbumModule } from './comentar-album/comentar-album.module';
import { RocktionaryComentarBandaModule } from './comentar-banda/comentar-banda.module';
import { RocktionaryUserFollowingUserModule } from './user-following-user/user-following-user.module';
import { RocktionaryEquipoModule } from './equipo/equipo.module';
import { PerfilModule } from './perfil/perfil.module';
import { RoctionaryLoggedInModule } from "./logged-in/logged-in.module";


import { RocktionaryPruebaModule } from './prueba/prueba.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        RocktionaryBandaModule,
        RocktionaryDiscograficaModule,
        RocktionaryComponenteModule,
        RocktionaryPuntuacionBandaModule,
        RocktionaryPuntuacionAlbumModule,
        RocktionaryPuntuacionCancionModule,
        RocktionaryAlbumModule,
        RocktionaryCancionModule,
        RocktionaryUserExtModule,
        RocktionaryComentarCancionModule,
        RocktionaryComentarAlbumModule,
        RocktionaryComentarBandaModule,
        RocktionaryUserFollowingUserModule,
        RocktionaryEquipoModule,
        PerfilModule,
        RoctionaryLoggedInModule,
        RocktionaryPruebaModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RocktionaryEntityModule {}
