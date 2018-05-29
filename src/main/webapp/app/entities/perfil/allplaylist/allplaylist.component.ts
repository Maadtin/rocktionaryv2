import {Component, Input, OnInit} from '@angular/core';
import {PlayList} from "../../../models/PlayList";
import {SpotifyUser} from "../../../models/SpotifyUser";
import {UserExtService} from "../../user-ext";
import {PlayLists} from "../../../models/PlayLists";
import {ActivatedRoute} from "@angular/router";
import {PerfilComponent} from "../perfil.component";

@Component({
  selector: 'jhi-allplaylist',
  templateUrl: './allplaylist.component.html',
  styleUrls: ['./allplaylist.scss']
})
export class AllplaylistComponent implements OnInit {


    public spotifyUser: SpotifyUser;
    public playLists: PlayLists;


    public showCreatePlayListform: boolean = false;
    public showAddTrackToPlayListForm: boolean = false;
    public showFormError: boolean = false;

    constructor(private userExtService: UserExtService) {}

    ngOnInit() {
        this.userExtService.getSpotifyUser().subscribe((spotifyUser: SpotifyUser) => this.spotifyUser = spotifyUser);
        this.userExtService.getUserPlayLists().subscribe((playList: PlayLists) =>  {

            this.playLists = playList;

            this.playLists.items.forEach((storedPlayList: PlayList) => {
                this.userExtService.getPlayList(this.spotifyUser.id, storedPlayList.id)
                    .subscribe((playList: PlayList) => {
                        storedPlayList.description = playList.description
                    })
            });
        });

        console.log(this);
    }

    createPlayList({ target: form }) {
        const playListData = {
            name: form.nombre.value,
            public: true,
            collaborative: false,
            description: form.description.value
        };

        if (!playListData.name) {
            this.showFormError = true;
            return;
        }

        this.userExtService.createPlayList (this.spotifyUser.id, playListData).subscribe((createdPlayList: PlayList) => {
            this.playLists.items.push(createdPlayList);
            form.reset();
            this.showFormError = false;
            this.showCreatePlayListform = false;
        });
    }

    removePlayList(userId: string, playListId: string) {
        this.userExtService.removePlayList(userId, playListId)
            .subscribe((response: Response) => this.playLists.items = this.playLists.items.filter((list: PlayList) => list.id !== playListId))
    }

    addTrackToPlayList($event) {
        console.log('adding track...')
    }
}
