import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase-service/firebase.service';
import { SoundCloudService } from '../../services/soundcloud-service/soundcloud.service';
import * as $ from 'jquery'; // TODO: Remove

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss']
})
export class QueueComponent implements OnInit {

  constructor(private fbService: FirebaseService, private scService: SoundCloudService) { }

  ngOnInit() {}

  removeTrack(trackId: string) {
    if (!this.fbService.user) {
      console.log("no user");
      const queues = this.fbService.queues;
      const trackIds = [];
      queues.map(value => {
        if (value !== trackId)
          trackIds.push(value);
      });
      this.fbService.setQueue(trackIds);
    }
    else
      this.fbService.removeFromQueue(trackId);
  }

  startQueue() {
    this.scService.playQueue(this.fbService.queues);
  }
}
