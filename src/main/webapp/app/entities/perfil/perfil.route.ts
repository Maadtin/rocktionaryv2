import { Routes } from "@angular/router";
import { PerfilComponent } from "./perfil.component";
import {UserRouteAccessService} from "../../shared/auth/user-route-access-service";


export const perfilRoute: Routes = [
    {
        path: 'perfil',
        component: PerfilComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rocktionaryApp.perfil.title'
        },
        canActivate: [UserRouteAccessService]
    }
]
