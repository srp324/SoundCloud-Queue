import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase-service/firebase.service';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss']
})
export class QueueComponent implements OnInit {

  constructor(private fbService: FirebaseService) { }

  ngOnInit() {
  }

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
    console.log(this.fbService.queues);
    //console.log("Playing...");
  }

}
