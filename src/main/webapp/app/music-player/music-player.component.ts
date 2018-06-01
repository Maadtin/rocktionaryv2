import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CancionService} from "../entities/cancion";
import {MusicPlayerService} from "./music-player.service";

@Component({
  selector: 'music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.scss']
})
export class MusicPlayerComponent implements OnInit {


  @Input() banda: string;
  @Input() cancion: string;

  private videoId: string;
  private currentTime: number;
  private totalTime: number;
  private player: YT.Player;


  private isPlaying: boolean = this.musicPlayerService.isPlaying;

  constructor(private cancionService: CancionService, public musicPlayerService: MusicPlayerService) { }

  ngOnInit() {
      this.bootstrapVideo(this.banda, this.cancion);
  }

  bootstrapVideo (group, song) {
      this.cancionService.getYoutubeVideo(group, song)
          .subscribe(video => {
              this.musicPlayerService.videoId = video.items[0].id.videoId;
          })
  }

  savePlayer (player) {
      this.musicPlayerService.onSavePlayer(player);
  }

  onStateChange (e) {
      this.musicPlayerService.onStatechange(e)
  }



}
