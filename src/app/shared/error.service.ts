import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  private errorDataSub = new BehaviorSubject<ErrorModel | null>(null)
  errorData$ = this.errorDataSub.asObservable()

  constructor() { }

  showError(data: ErrorModel) {
    this.errorDataSub.next(data)
  }

  showSimpleError(message: string) {
    this.errorDataSub.next({
      title: 'Error',
      type: 'error',
      buttonText: 'Close',
      message: message
    })
  }

  dismissError() {
    this.errorDataSub.next(null)
  }

}

export interface ErrorModel {
  title: string,
  message: string,
  buttonText: string
  type: 'warning' | 'error'
}
