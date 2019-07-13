import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import SC from 'soundcloud';
import 'soundcloud-widget'; // TODO: Remove

@Injectable({
  providedIn: 'root'
})
export class SoundCloudService {

  private player: any;
  private songPlaying = false;

  constructor() {
    console.log(SC.Widget.Events);
    SC.initialize({
      client_id: environment.soundcloud.client_id
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

  playQueue(queue: Array<any>) { //TODO: Remove from firebase queue
    //console.log(queue);

    if (queue[0]) {
      const trackId = queue[0].id;
      SC.stream('/tracks/' + trackId).then(player => {
        player.play();
        player.on('finish', () => {
          // player.kill();
          console.log("finished");
          if (queue[queue.indexOf(trackId) + 1]) {
            queue.shift();
            this.playQueue(queue);
          }
        });
      });
    }
  }
}
