import {Component, OnInit} from '@angular/core';
import {PlaylistService} from "../../services/playlist.service";
import {ActivatedRoute} from "@angular/router";
import {SongService} from "../../services/song.service";

@Component({
  selector: 'app-detail-playlist',
  templateUrl: './detail-playlist.component.html',
  styleUrls: ['./detail-playlist.component.css']
})
export class DetailPlaylistComponent implements OnInit {
  playlist_id = this.routerGetIdURL.snapshot.params.id;
  listSongs: any;
  allSong: any;
  name: any;
  songId?: number;
  countSong?: number;
  check = false;
  checkDelete = false;

  constructor(private playlistService: PlaylistService,
              private routerGetIdURL: ActivatedRoute,
              private songService: SongService) {
  }

  ngOnInit(): void {
    this.getSongs();
    this.getPlaylist();
    this.getAllSongs();
  }

  getSongs() {
    this.playlistService.getSongs(this.playlist_id).subscribe(res => {
      this.listSongs = res;
    })
  }

  getPlaylist() {
    this.playlistService.getPlayList(this.playlist_id).subscribe(res => {
      this.name = res.name;
    })
  }

  getAllSongs() {
    this.songService.getAll().subscribe(res => {
      this.allSong = res;
    });
  }

  addSong(id: number) {
    this.check = true;
    let data = {
      'playlist_id': this.playlist_id,
      'song_id': id,
    }
    this.playlistService.addSong(data).subscribe(res => {
      this.getSongs();
      this.check = false;
      if (res.status === 'errorLimit') {
        alert(res.message);
      }
      if (res.status === 'errorMatch') {
        alert(res.message);
      }
    });
  }

  deleteSong(id: number) {
    this.checkDelete=true;
    this.playlistService.delete(id).subscribe(res => {
      this.getSongs();
      this.checkDelete=false
    });
  }

  playSong(event: any, songId: number) {
    event.preventDefault();
    this.playlistService.getSongId(songId).subscribe(res => {
      this.songId = res[0].song_id;
    });
  }
}
