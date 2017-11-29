import { ErrorHandler } from '@angular/core';

export class AppErrorHandler implements ErrorHandler {
    handleError(error) {
        alert('An unexpected error has occurred'); //replace with toast notification
        console.log(error); //replace by logging error on server
    }
}