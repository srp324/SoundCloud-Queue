import { Injectable } from '@angular/core';
import SC from 'soundcloud';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() {
    SC.initialize({
      client_id: 'GYvpZm3S6Z8m7IRExO0VgEi10Y8AoT64',
      redirect_uri: 'http://example.com/callback'
    });
  }

  async searchTracks(query: string, limit: number, offset: number): Promise<any> {
    return SC.get('/tracks', {
      q: query, limit, offset
    });
  }
}
