import {Injectable} from "@angular/core";

@Injectable()
export class MusicPlayerService {

    public videoId: string;
    public isPlaying: boolean = false;
    public player: YT.Player;
    public currentDuration :any;
    public totalDuration :any;
    public videoInterval: any;
    public rangeVal: any;
    public max: any;

    toggleVideo () {
        console.log(this.player.getPlayerState());
        if (this.player.getPlayerState() === 5) {
            this.isPlaying = true;
            this.player.playVideo();
            this.initInterval();
        } else {

            if (this.player.getPlayerState() === 1) {
                this.isPlaying = false;
                this.player.pauseVideo();
                clearInterval(this.videoInterval)
            } else {
                this.isPlaying = true;
                this.player.playVideo();
                this.initInterval();
            }

        }
    }

    static secondsToMinutes (seconds: number): string {
        let minutes = Math.floor(seconds / 60);
        return minutes + ':' + MusicPlayerService.pad( (seconds - minutes * 60) );
    }

    static pad(num) {
        return ("0"+num).slice(-2);
    }

    initInterval () {
        this.videoInterval = setInterval(() => {
            let currentTime = parseInt(this.player.getCurrentTime().toFixed(0));
            let totalDuration = parseInt(this.player.getDuration().toFixed(1));
            this.rangeVal = currentTime;
            this.max = totalDuration;
            this.currentDuration = MusicPlayerService.secondsToMinutes(currentTime);
            this.totalDuration = MusicPlayerService.secondsToMinutes(totalDuration);

            console.log('current Duration ->', this.currentDuration);
            console.log('total Duration ->', this.totalDuration)
        }, 1000);
    }

    dragg () {
        this.player.seekTo(this.rangeVal, true);
    }


    onSavePlayer (player) {
        this.player = player;
        console.log('Player from MusicPlayerService ->', this.player);
    }
    onStatechange (e) {
        console.log('Player state from MusicPlayerService ->', this.player.getPlayerState())
    }


}
