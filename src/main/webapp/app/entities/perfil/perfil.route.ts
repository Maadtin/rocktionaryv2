import { Routes } from "@angular/router";
import { PerfilComponent } from "./perfil.component";


export const perfilRoute: Routes = [
    {
        path: 'perfil',
        component: PerfilComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rocktionaryApp.perfil.title'
        }
    }
]
