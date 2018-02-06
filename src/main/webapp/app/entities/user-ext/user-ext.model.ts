import { BaseEntity, User } from './../../shared';

export class UserExt implements BaseEntity {
    constructor(
        public id?: number,
        public fotoContentType?: string,
        public foto?: any,
        public latitud?: number,
        public longitud?: number,
        public localidad?: string,
        public user?: User,
    ) {
    }
}
