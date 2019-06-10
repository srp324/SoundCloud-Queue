import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase-service/firebase.service';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss']
})
export class QueueComponent implements OnInit {

  public tracks: any[] = [
    {
      name: "Alone",
      artist: "Marshmello",
      track_id: "12345"
    },
    {
      name: "Happier",
      artist: "Marshmello",
      track_id: "123456"
    },
  ];

  constructor(private firebase: FirebaseService) { }

  ngOnInit() {
    /*
    this.firebase.getUser('uWTOiIobilRy5mUhtUweVWYsc4U2').subscribe(result => {
      if (result[0]) {
        console.log(result[0].payload.doc.data());
      }
    });
    */
  }

  removeTrack(id: string) {
    console.log(id);
  }

  startQueue() {
    console.log("Playing...");
  }

}
