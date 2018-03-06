export class YoutubeModel {
    constructor(
        public etag?: string,
        public items?: any[],
        public kind?: string,
        public nextPageToken?: string,
        public pageInfo?: {
            resultsPerPage: number,
            totalResults: number
        }
    ) {

    }
}
