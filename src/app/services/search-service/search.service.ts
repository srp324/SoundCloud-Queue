import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import SC from 'soundcloud';
import 'soundcloud-widget';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() {
    console.log(SC.Widget.Events);
    SC.initialize({
      client_id: environment.soundcloud.client_id,
      redirect_uri: 'http://example.com/callback'
    });
  }

  searchTracks(query: string, limit: number, offset: number): Promise<any> {
    return SC.get('/tracks', {
      q: query, limit, offset
    });
  }

  playTrack(trackId: string): void {
    SC.stream('/tracks/' + trackId).then(player => {
      player.play();
    });
  }

  getTrack(trackId: string): any {
    return SC.get('/tracks/' + trackId);
  }
}
