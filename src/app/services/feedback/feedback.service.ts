import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class FeedbackService {

  constructor(private httpClient: HttpClient) { }

  getMyFeedback() {
    return this.httpClient.get('/getMyFeedback').map(response => {
      return response;
    });
  }

}
