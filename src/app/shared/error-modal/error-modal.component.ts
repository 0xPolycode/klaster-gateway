import { Component, OnInit } from '@angular/core';
import { ErrorService } from '../error.service';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.css']
})
export class ErrorModalComponent implements OnInit {

  errorData$ = this.errorService.errorData$

  constructor(private errorService: ErrorService) { }

  ngOnInit(): void {
  }

  dismiss() {
    this.errorService.dismissError()
  }

}
