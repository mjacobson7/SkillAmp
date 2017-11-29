import { DataService } from "../data/data.service";
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService extends DataService {

  constructor(http: Http) {
    super('/user-auth', http);
   }

}
