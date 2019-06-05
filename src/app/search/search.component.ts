import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search-service/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.searchService.searchTracks('Marshmello', 2, 0).then(tracks => {
      console.log(tracks);
    });
  }

}
