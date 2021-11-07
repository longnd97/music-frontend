import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SongService} from "../../services/song.service";
import {DataService} from "../../services/data.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  songs?: any
  key?: string
  otherMessage?: string;

  constructor(private songService: SongService,
              private dataService: DataService,
  ) {
  }

  ngOnInit(): void {
    this.getSongs()
  }

  getKey() {
    // @ts-ignore
  }

  getSongs() {
      // @ts-ignore
      this.otherMessage = this.dataService.currentMessage.subscribe(message => {
        this.otherMessage = message;
        this.songService.search(this.otherMessage).subscribe(res => {
          this.songs = res
          console.log(this.songs)
        })
      })
    }

  back() {
    this.otherMessage = '';
    this.songs = [];
  }

  }