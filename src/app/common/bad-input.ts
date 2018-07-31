import { AppError } from './app-error';

export class BadInput extends AppError {

    constructor(error?: any) {
        super();

        console.log('Bad Input', error);
    }
}

// 400
