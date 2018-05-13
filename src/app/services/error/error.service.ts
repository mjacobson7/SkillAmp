import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Forbidden } from '../../common/forbidden';
import { AppError } from '../../common/app-error';

@Injectable()
export class ErrorService {

  constructor() { }

  handleError(error: Response) {
    if(error.status === 403) {
      return Observable.throw(new Forbidden(error));
    }

    return Observable.throw(new AppError(error));
  }

}
