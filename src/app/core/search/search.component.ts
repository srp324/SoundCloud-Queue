import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SoundCloudService } from '../../services/soundcloud-service/soundcloud.service';
import { fromEvent } from 'rxjs';
import {
  debounceTime,
  map,
  distinctUntilChanged,
  filter
} from 'rxjs/operators';
import { FirebaseService } from '../../services/firebase-service/firebase.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @ViewChild('searchInput') searchInput: ElementRef;
  public tracks: any[] = [];
  isSearching: boolean;

  constructor(private scService: SoundCloudService, private fbService: FirebaseService) { }

  playTrack(trackId: string) {
    this.scService.playTrack(trackId);
  }

  addToQueue(trackId: string) {
    if (!this.fbService.user) {
      this.scService.getTrack(trackId).then(track => {
        this.fbService.queues.push(track);
      });
    }
    else
      this.fbService.addToQueue(trackId);
  }

  ngOnInit() {
    fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
        // get value
        map((event: any) => {
          return event.target.value;
        })
        // if character length greater then 2
        ,filter(res => res.length > 2)
        // Time in milliseconds between key events
        ,debounceTime(1000)
        // If previous query is diffent from current
        ,distinctUntilChanged()
        // subscription for response
      ).subscribe((text: string) => {
        this.isSearching = true;
        // TODO: Infinite scroll
        this.scService.searchTracks(text, 20, 0).then(tracks => {
          this.isSearching = false;
          this.tracks = tracks;
          console.log(this.tracks);
        }).catch(err => {
          this.isSearching = false;
          console.log('error', err);
        });
      });
   }
}
