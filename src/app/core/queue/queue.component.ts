import { Component, OnInit } from '@angular/core';
import { QueueService } from '../../services/queue-service/queue.service';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss']
})
export class QueueComponent implements OnInit {

  constructor(private queue: QueueService) { }

  ngOnInit() {
    this.queue.getUser('uWTOiIobilRy5mUhtUweVWYsc4U2').subscribe(result => {
      if (result[0]) {
        console.log(result[0].payload.doc.data());
      }
    });
  }

}
