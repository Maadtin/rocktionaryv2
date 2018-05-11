export class PlayList {
    constructor (
        public href?: string,
        public items?: [{
            collaborative: boolean,
            external_urls: {
                spotify: string
            },
            id: string,
            images: [{
                height: number,
                width: number,
                url: string
            }],
            name: string,
            owner: {
                display_name: string,
                id: string,
                type: string
            }
        }]
    ) {}
}
