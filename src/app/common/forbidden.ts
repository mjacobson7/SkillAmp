import { AppError } from './app-error';

export class Forbidden extends AppError {

    constructor(error?: any) {
        super();

        console.log('Forbidden', error);
    }

}

// 403
