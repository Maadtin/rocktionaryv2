export class UserPlaylist{
    constructor(
        public name?: string,
        public images?:[
            {
                height: number,
                url: string,
                width: number
            }
            ]

    ){}

}
