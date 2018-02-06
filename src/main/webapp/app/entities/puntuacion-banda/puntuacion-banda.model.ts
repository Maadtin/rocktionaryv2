import { BaseEntity, User } from './../../shared';

export class PuntuacionBanda implements BaseEntity {
    constructor(
        public id?: number,
        public valoracion?: number,
        public fechaPuntuacion?: any,
        public user?: User,
        public banda?: BaseEntity,
    ) {
    }
}
